import { OTPRepository } from "../repositories/otpRepositories";
import { EmailService } from "../services/emailService";
import crypto from "crypto";

export class OTPService {
  constructor(
    private otpRepository: OTPRepository,
    private emailService: EmailService
  ) {}

  private generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  public async generateAndSendOTP(email: string): Promise<void> {
    const otp = this.generateOTP();
    await this.otpRepository.saveOTP(email, otp);
    await this.emailService.sendOTPEmail(email, otp);
  }

  public async verifyOTP(email: string, otp: string): Promise<boolean> {
    return await this.otpRepository.verifyOTP(email, otp);
  }
}
