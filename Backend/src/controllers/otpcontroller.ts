import { Request, Response } from "express";
import { OTPService } from "../services/otpService";
import { EmailService } from "../services/emailService";

export class OTPController {
  constructor(
    private readonly otpService: OTPService,
    private readonly emailService: EmailService
  ) {}

  public sendOTP = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    if (!this.isValidEmail(email)) {
      res.status(400).json({ message: "Invalid email format" });
      return;
    }

    try {
      const otp = this.otpService.generateOTP();
      await Promise.all([
        this.otpService.saveOTP(email, otp),
        this.emailService.sendOTPEmail(email, otp),
      ]);

      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      this.handleError(res, error, "Error sending OTP");
    }
  };

  public verifyOTP = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;

    if (!this.isValidEmail(email) || !otp) {
      res.status(400).json({ message: "Invalid email or OTP" });
      return;
    }

    try {
      const isValid = await this.otpService.verifyOTP(email, otp);
      if (!isValid) {
        res.status(400).json({ message: "Invalid OTP" });
        return;
      }
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      this.handleError(res, error, "Error verifying OTP");
    }
  };

  private isValidEmail(email?: string): boolean {
    return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private handleError(res: Response, error: unknown, message: string): void {
    console.error(`${message}:`, error);
    res.status(500).json({
      message,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
