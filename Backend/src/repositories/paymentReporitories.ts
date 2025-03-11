import PaymentGateway from "../paymentGateways/paymentGateway";
import crypto from "crypto";
import { Event } from "../models/eventModal";

// Handle a Payment Interaction with Database
export class PaymentRepository {
  
  async findEventById(eventId: string) {
    return await Event.findById(eventId);
  }

  
   // Creates a payment order for the given amount.
   
  async createPaymentOrder(amount: number) {
    return await PaymentGateway.createOrder(amount);
  }

  
   //  Verifies the payment signature to prevent fraud.
   
  verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET || "")
      .update(body)
      .digest("hex");

    return expectedSignature === signature;
  }
}
