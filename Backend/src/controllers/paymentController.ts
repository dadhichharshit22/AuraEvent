import { Request, Response } from "express";
import EventAttendeeService from "../services/eventAttendeeService";
import PaymentGateway from "../paymentGateways/paymentGateway";
import { EmailService } from "../services/emailService";
import crypto from "crypto";

class PaymentService {
  constructor(private emailService: EmailService) {}

  public async processPaymentCapture(req: Request, res: Response): Promise<void> {
    try {
      const { eventId, userId } = req.body;

      if (!eventId || !userId) {
        res.status(400).json({ success: false, message: "Invalid request: Event ID and User ID are required." });
        return;
      }

      const event = await EventAttendeeService.getEventById(eventId);
      if (!event) {
        res.status(404).json({ success: false, message: "Event not found." });
        return;
      }

      if (EventAttendeeService.isUserRegistered(event, userId)) {
        res.status(400).json({ success: false, message: "User is already registered." });
        return;
      }

      const totalAmount = event.price || 0;
      const paymentResponse = await PaymentGateway.createOrder(totalAmount);

      res.json({ success: true, message: paymentResponse });
    } catch (error) {
      console.error("Error processing payment capture:", error);
      res.status(500).json({
        success: false,
        message: "Could not initiate order.",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public async processPaymentVerification(req: Request, res: Response): Promise<void> {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId, userId } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !eventId || !userId) {
        res.status(400).json({ success: false, message: "Invalid payment verification request." });
        return;
      }

      if (!PaymentService.isPaymentValid(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
        res.status(400).json({ success: false, message: "Payment verification failed." });
        return;
      }

      const attendeeAdded = await EventAttendeeService.addAttendee(eventId, userId);
      if (!attendeeAdded.success) {
        res.status(500).json(attendeeAdded);
        return;
      }

      res.status(200).json({ success: true, message: "Payment Verified" });
    } catch (error) {
      console.error("Error processing payment verification:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error.",
        error: error instanceof Error ? error.message : "Unknown error",
      });
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
