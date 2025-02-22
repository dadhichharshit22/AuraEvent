import OTP from "../models/otpModal";
import crypto from "crypto";

export class OTPService {
  // Generate OTP
  public generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Save OTP to DB
  public async saveOTP(email: string, otp: string): Promise<void> {
    await OTP.deleteMany({ email }); // Delete any existing OTPs for the email
    await OTP.create({ email, otp });
  }

  // Verify OTP
  public async verifyOTP(email: string, otp: string): Promise<boolean> {
    const storedOTP = await OTP.findOne({ email, otp });
    if (!storedOTP) return false;
    await OTP.deleteMany({ email }); // Delete OTP after verification
    return true;
  }
}
