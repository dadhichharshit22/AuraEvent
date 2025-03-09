import PaymentGateway from "../paymentGateways/paymentGateway";
import crypto from "crypto";
import {Event} from "../models/eventModal"; // Assuming there's an Event model

export class PaymentRepository {
  async findEventById(eventId: string) {
    return await Event.findById(eventId);
  }

  async createPaymentOrder(amount: number) {
    return await PaymentGateway.createOrder(amount);
  }

  verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET || "")
      .update(body)
      .digest("hex");

    return expectedSignature === signature;
  }
}
