import { OTPService } from "../services/otpService";
import OTP from "../models/OTP";

jest.mock("../models/OTP"); // Mock OTP model

describe("OTPService", () => {
  let otpService: OTPService;

  beforeEach(() => {
    otpService = new OTPService();
  });

  it("should generate a 6-digit OTP", () => {
    const otp = otpService.generateOTP();
    expect(otp).toMatch(/^\d{6}$/); // OTP should be a 6-digit number
  });

  it("should save OTP to the database", async () => {
    const email = "test@example.com";
    const otp = "123456";

    // Mocking the OTP.deleteMany and OTP.create methods
    (OTP.deleteMany as jest.Mock).mockResolvedValueOnce({ deletedCount: 1 });
    (OTP.create as jest.Mock).mockResolvedValueOnce({ email, otp });

    await otpService.saveOTP(email, otp);

    // Check that OTP.deleteMany and OTP.create were called with the correct arguments
    expect(OTP.deleteMany).toHaveBeenCalledWith({ email });
    expect(OTP.create).toHaveBeenCalledWith({ email, otp });
  });

  it("should handle errors while saving OTP", async () => {
    const email = "test@example.com";
    const otp = "123456";

    // Mock OTP.deleteMany to simulate an error
    (OTP.deleteMany as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    try {
      await otpService.saveOTP(email, otp);
    } catch (error: unknown) {
      // Type guard to handle the error correctly
      if (error instanceof Error) {
        expect(error.message).toBe("Database error");
      }
    }
  });

  it("should verify OTP successfully", async () => {
    const email = "test@example.com";
    const otp = "123456";

    // Mock OTP.findOne to return an OTP object
    (OTP.findOne as jest.Mock).mockResolvedValueOnce({ email, otp });

    const result = await otpService.verifyOTP(email, otp);

    expect(result).toBe(true);
    expect(OTP.deleteMany).toHaveBeenCalledWith({ email }); // OTP should be deleted after verification
  });

  it("should return false if OTP verification fails", async () => {
    const email = "test@example.com";
    const otp = "123456";

    // Mock OTP.findOne to return null (OTP not found)
    (OTP.findOne as jest.Mock).mockResolvedValueOnce(null);

    const result = await otpService.verifyOTP(email, otp);

    expect(result).toBe(false);
  });

  it("should handle errors while verifying OTP", async () => {
    const email = "test@example.com";
    const otp = "123456";

    // Mock OTP.findOne to simulate an error
    (OTP.findOne as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    try {
      await otpService.verifyOTP(email, otp);
    } catch (error: unknown) {
      // Type guard to handle the error correctly
      if (error instanceof Error) {
        expect(error.message).toBe("Database error");
      }
    }
  });
});
