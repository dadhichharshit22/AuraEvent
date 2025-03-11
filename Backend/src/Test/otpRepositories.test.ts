import { OTPRepository } from "../repositories/otpRepositories";
import OTP from "../../src/models/otpModal";

jest.mock("../../src/models/otpModal"); // Mock the Mongoose model

describe("OTPRepository", () => {
  let otpRepository: OTPRepository;

  beforeEach(() => {
    otpRepository = new OTPRepository();
    jest.clearAllMocks(); // Reset mocks before each test
  });

  describe("saveOTP", () => {
    it("should delete existing OTPs and save a new one", async () => {
      (OTP.deleteMany as jest.Mock).mockResolvedValue(undefined);
      (OTP.create as jest.Mock).mockResolvedValue(undefined);

      await otpRepository.saveOTP("test@example.com", "123456");

      expect(OTP.deleteMany).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(OTP.create).toHaveBeenCalledWith({ email: "test@example.com", otp: "123456" });
    });

    it("should throw an error if saving fails", async () => {
      (OTP.deleteMany as jest.Mock).mockResolvedValue(undefined);
      (OTP.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(otpRepository.saveOTP("test@example.com", "123456")).rejects.toThrow("Database error");
    });
  });

  describe("verifyOTP", () => {
    it("should return true if OTP is found and delete existing OTPs", async () => {
      (OTP.findOne as jest.Mock).mockResolvedValue({ email: "test@example.com", otp: "123456" });
      (OTP.deleteMany as jest.Mock).mockResolvedValue(undefined);

      const result = await otpRepository.verifyOTP("test@example.com", "123456");

      expect(OTP.findOne).toHaveBeenCalledWith({ email: "test@example.com", otp: "123456" });
      expect(OTP.deleteMany).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(result).toBe(true);
    });

    it("should return false if OTP is not found", async () => {
      (OTP.findOne as jest.Mock).mockResolvedValue(null);

      const result = await otpRepository.verifyOTP("test@example.com", "123456");

      expect(OTP.findOne).toHaveBeenCalledWith({ email: "test@example.com", otp: "123456" });
      expect(result).toBe(false);
    });

    it("should throw an error if verification fails", async () => {
      (OTP.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(otpRepository.verifyOTP("test@example.com", "123456")).rejects.toThrow("Database error");
    });
  });
});
