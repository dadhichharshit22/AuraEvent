import { Request, Response } from "express";
import { OTPService } from "../services/otpService";
import { EmailService } from "../services/emailService";

export class OTPController {
  private otpService: OTPService;
  private emailService: EmailService;

  constructor(otpService: OTPService, emailService: EmailService) {
    this.otpService = otpService;
    this.emailService = emailService;
  }

  // Send OTP via email
  public sendOTP = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    try {
      const otp = this.otpService.generateOTP();
      await this.otpService.saveOTP(email, otp);
      await this.emailService.sendOTPEmail(email, otp);
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error('Error in send OTP:', error);
      res.status(500).json({
        message: "Error sending OTP",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // Verify OTP
  public verifyOTP = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;

    try {
      const isValid = await this.otpService.verifyOTP(email, otp);
      if (!isValid) {
        res.status(400).json({ message: "Invalid OTP" });
        return;
      }
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}
