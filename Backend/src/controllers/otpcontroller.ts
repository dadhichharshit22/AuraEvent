import { Request, Response } from "express";
import { OTPService } from "../services/otpService";

//  Controller for handling One-Time Password (OTP) operations.
export class OneTimePasswordController {
  constructor(private oneTimePasswordService: OTPService) {}

  // Handles OTP generation and sending.

  async sendOneTimePassword(req: Request, res: Response): Promise<void> {
    try {
      const email = this.getEmailFromRequest(req, res);
      if (!email) return;

      await this.oneTimePasswordService.generateAndSendOTP(email);

      this.respondWithSuccess(res, "One-Time Password sent successfully.");
    } catch (error) {
      this.respondWithServerError(res, "Failed to generate or send OTP.");
    }
  }

  //Handles OTP verification.
  async validateOneTimePassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = this.getOtpDetailsFromRequest(req, res);
      if (!email || !otp) return;

      const isOtpValid = await this.oneTimePasswordService.verifyOTP(
        email,
        otp
      );
      if (!isOtpValid) {
        this.respondWithClientError(
          res,
          "Invalid or expired One-Time Password."
        );
        return;
      }

      this.respondWithSuccess(res, "One-Time Password verified successfully.");
    } catch (error) {
      this.respondWithServerError(res, "Failed to validate OTP.");
    }
  }

  // Extracts and validates the email from the request.
  private getEmailFromRequest(req: Request, res: Response): string | null {
    const { email } = req.body;

    if (!email) {
      this.respondWithClientError(res, "Email is required.");
      return null;
    }

    return email;
  }

  // Extracts and validates the email and OTP from the request.
  private getOtpDetailsFromRequest(
    req: Request,
    res: Response
  ): { email: string | null; otp: string | null } {
    const { email, otp } = req.body;

    if (!email || !otp) {
      this.respondWithClientError(
        res,
        "Email and One-Time Password are required."
      );
      return { email: null, otp: null };
    }

    return { email, otp };
  }

  private respondWithSuccess(res: Response, message: string): void {
    res.status(200).json({ success: true, message });
  }

  private respondWithClientError(res: Response, message: string): void {
    res.status(400).json({ success: false, message });
  }

  private respondWithServerError(res: Response, message: string): void {
    res.status(500).json({ success: false, message });
  }
}
