import { razorpayInstance } from "../config/razorpayConnection";

class PaymentGateway {
  static async createOrder(amount: number) {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: Math.random().toString(),
    };

    return await razorpayInstance.orders.create(options);
  }
}

export default PaymentGateway;
