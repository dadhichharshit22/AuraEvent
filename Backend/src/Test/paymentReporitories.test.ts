import { PaymentRepository } from "../repositories/paymentReporitories";
import PaymentGateway from "../../src/paymentGateways/paymentGateway";
import { Event } from "../../src/models/eventModal";
import crypto from "crypto";

jest.mock("../../src/models/eventModal"); // Mock Mongoose model
jest.mock("../../src/paymentGateways/paymentGateway"); // Mock Payment Gateway

describe("PaymentRepository", () => {
  let paymentRepository: PaymentRepository;

  beforeEach(() => {
    paymentRepository = new PaymentRepository();
    jest.clearAllMocks(); // Reset mocks before each test
  });

  describe("findEventById", () => {
    it("should return an event if found", async () => {
      const mockEvent = { _id: "123", name: "Tech Event" };
      (Event.findById as jest.Mock).mockResolvedValue(mockEvent);

      const result = await paymentRepository.findEventById("123");

      expect(Event.findById).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockEvent);
    });

    it("should return null if event is not found", async () => {
      (Event.findById as jest.Mock).mockResolvedValue(null);

      const result = await paymentRepository.findEventById("unknown_event_id");

      expect(Event.findById).toHaveBeenCalledWith("unknown_event_id");
      expect(result).toBeNull();
    });
  });

  describe("createPaymentOrder", () => {
    it("should create a payment order and return its details", async () => {
      const mockOrder = { id: "order_123", amount: 500 };
      (PaymentGateway.createOrder as jest.Mock).mockResolvedValue(mockOrder);

      const result = await paymentRepository.createPaymentOrder(500);

      expect(PaymentGateway.createOrder).toHaveBeenCalledWith(500);
      expect(result).toEqual(mockOrder);
    });

    it("should throw an error if payment order creation fails", async () => {
      (PaymentGateway.createOrder as jest.Mock).mockRejectedValue(new Error("Payment error"));

      await expect(paymentRepository.createPaymentOrder(500)).rejects.toThrow("Payment error");
    });
  });

  describe("verifyPaymentSignature", () => {
    it("should return true for a valid signature", () => {
      const orderId = "order_123";
      const paymentId = "payment_456";
      const secret = "test_secret";

      process.env.RAZORPAY_SECRET = secret;

      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      const result = paymentRepository.verifyPaymentSignature(orderId, paymentId, expectedSignature);

      expect(result).toBe(true);
    });

    it("should return false for an invalid signature", () => {
      const orderId = "order_123";
      const paymentId = "payment_456";

      process.env.RAZORPAY_SECRET = "wrong_secret";

      const invalidSignature = "invalid_signature";

      const result = paymentRepository.verifyPaymentSignature(orderId, paymentId, invalidSignature);

      expect(result).toBe(false);
    });
  });
});
