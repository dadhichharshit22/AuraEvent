import OTP from "../models/otp";
import crypto from "crypto";

export class OTPService {
  // Generate OTP
  public generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  // Save OTP to DB with expiry time (5 minutes from creation)
  public async saveOTP(email: string, otp: string): Promise<void> {
    const expiryTime = new Date(Date.now() + 5 * 60 * 1000); // Store as Date object
    await OTP.deleteMany({ email }); // Delete any existing OTPs for the email
    await OTP.create({ email, otp, expiryTime });
  }

  public async verifyOTP(email: string, otp: string): Promise<boolean> {
    try {
      const storedOTP = await OTP.findOne({ email });
  
      if (!storedOTP) {
        console.error(`No OTP found for ${email}`);
        return false;
      }
  
      if (Date.now() > storedOTP.expiryTime.getTime()) {
        console.error(`OTP expired for ${email}`);
        await OTP.deleteMany({ email });
        return false;
      }
  
      if (storedOTP.otp.trim() !== otp.trim()) {
        console.error(`Invalid OTP for ${email}. Expected: ${storedOTP.otp}, Received: ${otp}`);
        return false;
      }
  
      await OTP.deleteMany({ email }); // Delete OTP after successful verification
      return true;
    } catch (error) {
      console.error("Error in verifyOTP:", error);
      throw error; // Rethrow to be caught by the controller
    }
  }
  
  
}
