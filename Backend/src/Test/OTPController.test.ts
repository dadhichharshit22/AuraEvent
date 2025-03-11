import { Request, Response } from "express";
import { OneTimePasswordController } from "../controllers/otpcontroller";
import { OTPService } from "../services/otpService";

describe("OneTimePasswordController", () => {
  let otpServiceMock: Partial<OTPService>;
  let otpController: OneTimePasswordController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    otpServiceMock = {
      generateAndSendOTP: jest.fn(),
      verifyOTP: jest.fn(),
    };

    otpController = new OneTimePasswordController(otpServiceMock as OTPService);

    jsonMock = jest.fn();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jsonMock,
    };
  });

  describe("sendOneTimePassword", () => {
    it("should return 200 status and success message when OTP is sent", async () => {
      mockRequest = { body: { email: "test@example.com" } };
      (otpServiceMock.generateAndSendOTP as jest.Mock).mockResolvedValueOnce(undefined);

      await otpController.sendOneTimePassword(mockRequest as Request, mockResponse as Response);

      expect(otpServiceMock.generateAndSendOTP).toHaveBeenCalledWith("test@example.com");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ success: true, message: "One-Time Password sent successfully." });
    });

    it("should return 400 status when email is missing", async () => {
      mockRequest = { body: {} };

      await otpController.sendOneTimePassword(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ success: false, message: "Email is required." });
    });

    it("should return 500 status when OTP sending fails", async () => {
      mockRequest = { body: { email: "test@example.com" } };
      (otpServiceMock.generateAndSendOTP as jest.Mock).mockRejectedValueOnce(new Error("Service failure"));

      await otpController.sendOneTimePassword(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ success: false, message: "Failed to generate or send OTP." });
    });
  });

  describe("validateOneTimePassword", () => {
    it("should return 200 status and success message when OTP is valid", async () => {
      mockRequest = { body: { email: "test@example.com", otp: "123456" } };
      (otpServiceMock.verifyOTP as jest.Mock).mockResolvedValueOnce(true);

      await otpController.validateOneTimePassword(mockRequest as Request, mockResponse as Response);

      expect(otpServiceMock.verifyOTP).toHaveBeenCalledWith("test@example.com", "123456");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ success: true, message: "One-Time Password verified successfully." });
    });

    it("should return 400 status when email or OTP is missing", async () => {
      mockRequest = { body: { email: "test@example.com" } };

      await otpController.validateOneTimePassword(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ success: false, message: "Email and One-Time Password are required." });
    });

    it("should return 400 status when OTP is invalid", async () => {
      mockRequest = { body: { email: "test@example.com", otp: "wrongOTP" } };
      (otpServiceMock.verifyOTP as jest.Mock).mockResolvedValueOnce(false);

      await otpController.validateOneTimePassword(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ success: false, message: "Invalid or expired One-Time Password." });
    });

    it("should return 500 status when OTP verification fails", async () => {
      mockRequest = { body: { email: "test@example.com", otp: "123456" } };
      (otpServiceMock.verifyOTP as jest.Mock).mockRejectedValueOnce(new Error("Service failure"));

      await otpController.validateOneTimePassword(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ success: false, message: "Failed to validate OTP." });
    });
  });
});
