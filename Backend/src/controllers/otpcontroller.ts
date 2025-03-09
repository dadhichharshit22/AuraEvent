import { Request, Response } from "express";
import { OTPService } from "../services/otpService";

/**
 * Controller for handling One-Time Password (OTP) operations.
 */
export class OneTimePasswordController {
  constructor(private oneTimePasswordService: OTPService) {}

  /**
   * Handles OTP generation and sending.
   * Validates the request before generating and sending an OTP.
   */
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

  /**
   * Handles OTP verification.
   * Validates the OTP provided by the user and checks if it is valid.
   */
  async validateOneTimePassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = this.getOtpDetailsFromRequest(req, res);
      if (!email || !otp) return;

      const isOtpValid = await this.oneTimePasswordService.verifyOTP(email, otp);
      if (!isOtpValid) {
        this.respondWithClientError(res, "Invalid or expired One-Time Password.");
        return;
      }

      this.respondWithSuccess(res, "One-Time Password verified successfully.");
    } catch (error) {
      this.respondWithServerError(res, "Failed to validate OTP.");
    }
  }

  /**
   * Extracts and validates the email from the request.
   * @returns Email if valid, otherwise null.
   */
  private getEmailFromRequest(req: Request, res: Response): string | null {
    const { email } = req.body;

    if (!email) {
      this.respondWithClientError(res, "Email is required.");
      return null;
    }

    return email;
  }

  /**
   * Extracts and validates the email and OTP from the request.
   * @returns An object containing email and OTP, or null values if validation fails.
   */
  private getOtpDetailsFromRequest(req: Request, res: Response): { email: string | null; otp: string | null } {
    const { email, otp } = req.body;

    if (!email || !otp) {
      this.respondWithClientError(res, "Email and One-Time Password are required.");
      return { email: null, otp: null };
    }

    return { email, otp };
  }


  /**
   * Sends a success response with a 200 status code.
   */
  private respondWithSuccess(res: Response, message: string): void {
    res.status(200).json({ success: true, message });
  }

  /**
   * Sends a client error response with a 400 status code.
   */
  private respondWithClientError(res: Response, message: string): void {
    res.status(400).json({ success: false, message });
  }

  /**
   * Sends a server error response with a 500 status code.
   */
  private respondWithServerError(res: Response, message: string): void {
    res.status(500).json({ success: false, message });
  }
}
