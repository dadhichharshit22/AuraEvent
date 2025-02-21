import { OTPService } from "../services/otpService";
import OTP from "../models/OTP";

jest.mock("../models/OTP");

describe("OTPService", () => {
  let otpService: OTPService;

  beforeEach(() => {
    otpService = new OTPService();
  });

  it("should generate a 6-digit OTP", () => {
    const otp = otpService.generateOTP();
    expect(otp).toMatch(/^\d{6}$/);
  });

  it("should save OTP to the database", async () => {
    const email = "test@example.com";
    const otp = "123456";

    (OTP.deleteMany as jest.Mock).mockResolvedValueOnce({ deletedCount: 1 });
    (OTP.create as jest.Mock).mockResolvedValueOnce({ email, otp });

    await otpService.saveOTP(email, otp);

    expect(OTP.deleteMany).toHaveBeenCalledWith({ email });
    expect(OTP.create).toHaveBeenCalledWith({ email, otp });
  });

  it("should handle errors while saving OTP", async () => {
    const email = "test@example.com";
    const otp = "123456";

    (OTP.deleteMany as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    try {
      await otpService.saveOTP(email, otp);
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toBe("Database error");
      }
    }
  });

  it("should verify OTP successfully", async () => {
    const email = "test@example.com";
    const otp = "123456";

    (OTP.findOne as jest.Mock).mockResolvedValueOnce({ email, otp });

    const result = await otpService.verifyOTP(email, otp);

    expect(result).toBe(true);
    expect(OTP.deleteMany).toHaveBeenCalledWith({ email });
  });

  it("should return false if OTP verification fails", async () => {
    const email = "test@example.com";
    const otp = "123456";

    (OTP.findOne as jest.Mock).mockResolvedValueOnce(null);

    const result = await otpService.verifyOTP(email, otp);

    expect(result).toBe(false);
  });

  it("should handle errors while verifying OTP", async () => {
    const email = "test@example.com";
    const otp = "123456";

    (OTP.findOne as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    try {
      await otpService.verifyOTP(email, otp);
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toBe("Database error");
      }
    }
  });
});
