import { razorpayInstance } from "../config/razorpayConnection";

class PaymentGateway {
  private static readonly CURRENCY = "INR";
  private static readonly CONVERSION_RATE = 100; 

  static async createOrder(amount: number): Promise<{ id: string; status: string }> {
    try {
      const options = this.getOrderOptions(amount);
      const order = await razorpayInstance.orders.create(options);
      return order;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      throw new Error("Payment order creation failed");
    }
  }

  private static getOrderOptions(amount: number) {
    return {
      amount: amount * this.CONVERSION_RATE, 
      currency: this.CURRENCY,
      receipt: this.generateReceiptId(),
    };
  }

  private static generateReceiptId(): string {
    return `receipt_${Date.now()}`;
  }
}

export default PaymentGateway;
