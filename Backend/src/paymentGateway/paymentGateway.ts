import { instance } from "../config/razorpay";

class PaymentGateway {
  static async createOrder(amount: number) {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: Math.random().toString(),
    };

    return await instance.orders.create(options);
  }
}

export default PaymentGateway;
