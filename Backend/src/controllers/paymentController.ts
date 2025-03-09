import { Request, Response } from "express";
import { PaymentService } from "../services/paymentService";

/**
 * Handles payment-related actions such as capturing and verifying payments.
 */
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // ──────────────────────────────────────────────────────────────────────
  // ░░░░░░░░░░░░░░░ PUBLIC METHODS ░░░░░░░░░░░░░░░
  // ──────────────────────────────────────────────────────────────────────

  /**
   * Captures a payment for an event.
   */
  public async capturePayment(req: Request, res: Response): Promise<void> {
    try {
      const eventDetails = this.getEventDetails(req, res);
      if (!eventDetails) return;

      const { eventId, userId } = eventDetails;
      const confirmation = await this.paymentService.capturePayment(eventId, userId);

      this.sendSuccessResponse(res, this.formatPaymentConfirmation(confirmation));
    } catch (error) {
      this.handleError(res, "Payment capture failed", error);
    }
  }

  /**
   * Verifies payment details and confirms event registration.
   */
  public async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      const paymentDetails = this.getPaymentDetails(req, res);
      if (!paymentDetails) return;

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId, userId } = paymentDetails;
      const verificationResult = await this.paymentService.verifyPayment(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        eventId,
        userId
      );

      if (!verificationResult.success) {
         this.sendErrorResponse(res, "Payment verification failed", 400);
      }

      this.sendSuccessResponse(res, "Payment verified successfully.");
    } catch (error) {
      this.handleError(res, "Payment verification failed", error);
    }
  }

  // ──────────────────────────────────────────────────────────────────────
  // ░░░░░░░░░░░░░░░ PRIVATE METHODS ░░░░░░░░░░░░░░░
  // ──────────────────────────────────────────────────────────────────────

  /**
   * Extracts event and user details from the request.
   * Returns null if validation fails.
   */
  private getEventDetails(req: Request, res: Response): { eventId: string; userId: string } | null {
    const { eventId, userId } = req.body;

    if (!eventId || !userId) {
      return this.sendErrorResponse(res, "Event ID and User ID are required", 400);
    }

    return { eventId, userId };
  }

  /**
   * Extracts payment details from the request.
   * Returns null if validation fails.
   */
  private getPaymentDetails(
    req: Request,
    res: Response
  ): { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; eventId: string; userId: string } | null {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId, userId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !eventId || !userId) {
      return this.sendErrorResponse(res, "All payment details are required", 400);
    }

    return { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId, userId };
  }

  /**
   * Formats the payment confirmation response.
   */
  private formatPaymentConfirmation(confirmation: string | { id: string; status: string }): string {
    return typeof confirmation === "string"
      ? confirmation
      : `Payment successful: ${confirmation.id}, Status: ${confirmation.status}`;
  }

  /**
   * Sends a success response.
   */
  private sendSuccessResponse(res: Response, message: string): void {
    res.status(200).json({ success: true, message });
  }

  /**
   * Sends an error response with a specific status code.
   */
  private sendErrorResponse(res: Response, message: string, statusCode: number = 500): null {
    res.status(statusCode).json({ success: false, message });
    return null;
  }

  /**
   * Logs errors and sends an appropriate error response.
   */
  private handleError(res: Response, logMessage: string, error: unknown): void {
    console.error(logMessage, error);
    const errorMessage = error instanceof Error ? error.message : "Unexpected error occurred";
    this.sendErrorResponse(res, errorMessage);
  }
}
