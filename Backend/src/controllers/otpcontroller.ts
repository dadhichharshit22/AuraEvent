import { Request, Response } from "express";
import { OTPService } from "../services/otpService";

export class OTPController {
  constructor(private otpService: OTPService) {}

  async requestOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ success: false, message: "Email is required." });
        return;
      }

      await this.otpService.generateAndSendOTP(email);
      res.status(200).json({ success: true, message: "OTP sent successfully." });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error sending OTP." });
    }
  }

  async verifyOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        res.status(400).json({ success: false, message: "Email and OTP are required." });
        return;
      }

      const isValid = await this.otpService.verifyOTP(email, otp);
      if (!isValid) {
        res.status(400).json({ success: false, message: "Invalid or expired OTP." });
        return;
      }

      res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error verifying OTP." });
    }
  }
}
