import request from "supertest";
import express from "express";
import PaymentService from "../controllers/paymentController";
import EventService from "../services/eventAttendee";
import PaymentGateway from "../paymentGateways/paymentGateway";
import { EmailService } from "../services/emailService";

const app = express();
app.use(express.json());

jest.mock("../services/findEventService", () => ({
  getEventById: jest.fn(),
  isUserRegistered: jest.fn(),
  addAttendee: jest.fn(),
}));

jest.mock("../gateways/paymentGateway", () => ({
  createOrder: jest.fn(),
}));

const mockEmailService = new EmailService();
const paymentService = new PaymentService(mockEmailService);

app.post("/capturePayment", (req, res) =>
  paymentService.capturePayment(req, res)
);
app.post("/verifyPayment", (req, res) =>
  paymentService.verifyPayment(req, res)
);

describe("PaymentService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("verifyPayment", () => {
    it("should return 400 if payment verification fails", async () => {
      jest.spyOn(paymentService, "isPaymentValid").mockReturnValue(false);

      const response = await request(app).post("/verifyPayment").send({
        razorpay_order_id: "order123",
        razorpay_payment_id: "payment123",
        razorpay_signature: "invalid_signature",
        eventId: "event123",
        userId: "user123",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: "Payment verification failed",
      });
    });

    it("should return 200 if payment is verified and attendee is added", async () => {
      jest.spyOn(paymentService, "isPaymentValid").mockReturnValue(true);
      (EventService.addAttendee as jest.Mock).mockResolvedValue({
        success: true,
      });

      const response = await request(app).post("/verifyPayment").send({
        razorpay_order_id: "order123",
        razorpay_payment_id: "payment123",
        razorpay_signature: "valid_signature",
        eventId: "event123",
        userId: "user123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: "Payment Verified",
      });
    });
  });
});
