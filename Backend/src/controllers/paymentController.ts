import { Request, Response } from "express";
import EventService from "../services/eventAttendessService";
import PaymentGateway from "../paymentGateway/paymentGateway";
import { EmailService } from "../services/emailService";
import crypto from "crypto";

class PaymentService {
  constructor(private emailService: EmailService) {}

  public async capturePayment(req: Request, res: Response): Promise<void> {
    try {
      console.log("Request body:", req.body);
      const { eventId, userId }: { eventId: string; userId: string } = req.body;

      if (!eventId) {
        res.status(400).json({ success: false, message: "Please provide Event Id" });
        return;
      }

      const event = await EventService.getEventById(eventId);
      if (!event) {
        res.status(404).json({ success: false, message: "Event not found" });
        return;
      }

      if (EventService.isUserRegistered(event, userId)) {
        res.status(400).json({ success: false, message: "User is already registered." });
        return;
      }

      const totalAmount = event.price || 0;
      const paymentResponse = await PaymentGateway.createOrder(totalAmount);

      console.log("Payment Response:", paymentResponse);
      res.json({ success: true, message: paymentResponse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Could not initiate order" });
    }
  }

  public async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId, userId } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !eventId || !userId) {
        res.status(400).json({ success: false, message: "Payment Failed" });
        return;
      }

      if (!PaymentService.isPaymentValid(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
        res.status(400).json({ success: false, message: "Payment verification failed" });
        return;
      }

      const attendeeAdded = await EventService.addAttendee(eventId, userId);
      if (!attendeeAdded.success) {
        res.status(500).json(attendeeAdded);
        return;
      }

      res.status(200).json({ success: true, message: "Payment Verified" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  private static isPaymentValid(orderId: string, paymentId: string, signature: string): boolean {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET || "")
      .update(body)
      .digest("hex");

    return expectedSignature === signature;
  }
}

export default PaymentService;
