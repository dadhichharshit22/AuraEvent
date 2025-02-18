import { Request, Response } from "express";
import OTP from "../models/OTP";
import { EmailService } from "../services/emailService";
import crypto from "crypto";

export class OTPController {
  constructor(private emailService: EmailService) {
    this.sendOTP = this.sendOTP.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
  }

  /**
   * Generates a 6-digit random OTP.
   */
  private generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  /**
   * Sends an OTP to the given email.
   */
  public async sendOTP(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    try {
      const otp = this.generateOTP();

      // Remove existing OTPs for the email
      await OTP.deleteMany({ email });

      // Save new OTP in database
      await OTP.create({ email, otp });

      // Send OTP via email
      await this.emailService.sendOTPEmail(email, otp);

      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ 
        message: "Error sending OTP",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }

  /**
   * Verifies an OTP for the given email.
   */
  public async verifyOTP(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({ message: "Email and OTP are required" });
      return;
    }

    try {
      const storedOTP = await OTP.findOne({ email, otp });

      if (!storedOTP) {
        res.status(400).json({ message: "Invalid OTP" });
        return;
      }

      // Remove OTP after successful verification
      await OTP.deleteMany({ email });

      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
