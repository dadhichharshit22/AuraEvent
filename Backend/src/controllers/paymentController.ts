import { Request, Response } from "express";
import { PaymentService } from "../services/paymentService";

export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  public async processPaymentCapture(req: Request, res: Response): Promise<void> {
    try {
      const { eventId, userId } = req.body;
      const paymentResponse = await this.paymentService.capturePayment(eventId, userId);
      res.json({ success: true, message: paymentResponse });
    } catch (error) {
      console.error("Error processing payment capture:", error);

      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      res.status(500).json({ success: false, message: errorMessage });
    }
  }

  public async processPaymentVerification(req: Request, res: Response): Promise<void> {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId, userId } = req.body;
      const attendeeAdded = await this.paymentService.verifyPayment(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        eventId,
        userId
      );

      if (!attendeeAdded.success) {
        res.status(500).json(attendeeAdded);
        return;
      }

      res.status(200).json({ success: true, message: "Payment Verified" });
    } catch (error) {
      console.error("Error processing payment verification:", error);

      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      res.status(500).json({ success: false, message: errorMessage });
    }
  }
}
