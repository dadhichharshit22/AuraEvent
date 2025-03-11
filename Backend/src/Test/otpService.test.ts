import { OTPService } from "../services/otpService";
import { OTPRepository } from "../repositories/otpRepositories";
import { EmailService } from "../services/emailService";

jest.mock("../repositories/otpRepositories");
jest.mock("../services/emailService");

describe("OTPService", () => {
  let otpService: OTPService;
  let otpRepositoryMock: jest.Mocked<OTPRepository>;
  let emailServiceMock: jest.Mocked<EmailService>;

  beforeEach(() => {
    otpRepositoryMock = new OTPRepository() as jest.Mocked<OTPRepository>;
    emailServiceMock = new EmailService() as jest.Mocked<EmailService>;
    otpService = new OTPService(otpRepositoryMock, emailServiceMock);
  });

  describe("generateAndSendOTP", () => {
    it("should generate an OTP, save it, and send an email", async () => {
      // Arrange
      const mockEmail = "test@example.com";
      otpRepositoryMock.saveOTP = jest.fn().mockResolvedValue(undefined);
      emailServiceMock.sendOtpEmail = jest.fn().mockResolvedValue(undefined);

      // Act
      await otpService.generateAndSendOTP(mockEmail);

      // Assert
      expect(otpRepositoryMock.saveOTP).toHaveBeenCalledWith(
        mockEmail,
        expect.any(String) // Ensure OTP is a string
      );
      expect(emailServiceMock.sendOtpEmail).toHaveBeenCalledWith(
        mockEmail,
        expect.any(String)
      );
    });
  });

  describe("verifyOTP", () => {
    it("should return true if the OTP is correct", async () => {
      // Arrange
      const mockEmail = "test@example.com";
      const mockOTP = "123456";
      otpRepositoryMock.verifyOTP = jest.fn().mockResolvedValue(true);

      // Act
      const result = await otpService.verifyOTP(mockEmail, mockOTP);

      // Assert
      expect(result).toBe(true);
      expect(otpRepositoryMock.verifyOTP).toHaveBeenCalledWith(mockEmail, mockOTP);
    });

    it("should return false if the OTP is incorrect", async () => {
      // Arrange
      const mockEmail = "test@example.com";
      const mockOTP = "654321";
      otpRepositoryMock.verifyOTP = jest.fn().mockResolvedValue(false);

      // Act
      const result = await otpService.verifyOTP(mockEmail, mockOTP);

      // Assert
      expect(result).toBe(false);
      expect(otpRepositoryMock.verifyOTP).toHaveBeenCalledWith(mockEmail, mockOTP);
    });
  });
});
