import OTP from "../models/otpModal";
import crypto from "crypto";

export class OTPService {
  
  public generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  
  public async saveOTP(email: string, otp: string): Promise<void> {
    await OTP.deleteMany({ email }); 
    await OTP.create({ email, otp });
  }

  
  public async verifyOTP(email: string, otp: string): Promise<boolean> {
    const storedOTP = await OTP.findOne({ email, otp });
    if (!storedOTP) return false;
    await OTP.deleteMany({ email }); 
    return true;
  }
}
