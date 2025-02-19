import request from "supertest";
import express from "express";
import { OTPController } from "../controllers/otpcontroller";
import { OTPService } from "../services/otpService";
import { EmailService } from "../services/emailService";

const app = express();
app.use(express.json());

const mockOTPService = {
  generateOTP: jest.fn().mockReturnValue("123456"),
  saveOTP: jest.fn().mockResolvedValue(undefined),
  verifyOTP: jest.fn().mockResolvedValue(true),
};

const mockEmailService = {
  sendOTPEmail: jest.fn().mockResolvedValue(undefined),
};

const otpController = new OTPController(
  mockOTPService as unknown as OTPService,
  mockEmailService as unknown as EmailService
);

app.post("/api/otp/send", otpController.sendOTP);
app.post("/api/otp/verify", otpController.verifyOTP);

describe("OTPController", () => {
  describe("sendOTP", () => {
    it("should send OTP successfully", async () => {
      const res = await request(app)
        .post("/api/otp/send")
        .send({ email: "test@example.com" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "OTP sent successfully");
      expect(mockOTPService.generateOTP).toHaveBeenCalled();
      expect(mockOTPService.saveOTP).toHaveBeenCalledWith(
        "test@example.com",
        "123456"
      );
      expect(mockEmailService.sendOTPEmail).toHaveBeenCalledWith(
        "test@example.com",
        "123456"
      );
    });

    it("should return 400 if email is missing", async () => {
      const res = await request(app).post("/api/otp/send").send({});
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Email is required");
    });
  });

  describe("verifyOTP", () => {
    it("should verify OTP successfully", async () => {
      const res = await request(app)
        .post("/api/otp/verify")
        .send({ email: "test@example.com", otp: "123456" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "OTP verified successfully");
      expect(mockOTPService.verifyOTP).toHaveBeenCalledWith(
        "test@example.com",
        "123456"
      );
    });

    it("should return 400 if OTP is invalid", async () => {
      mockOTPService.verifyOTP.mockResolvedValueOnce(false);
      const res = await request(app)
        .post("/api/otp/verify")
        .send({ email: "test@example.com", otp: "000000" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid OTP");
    });
  });
});
