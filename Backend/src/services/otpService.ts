import { OTPRepository } from "../repositories/otpRepositories";
import { EmailService } from "../services/emailService";
import crypto from "crypto";

// Services of One Time Password 
export class OTPService {
  constructor(
    private otpRepository: OTPRepository,
    private emailService: EmailService
  ) {}

    // handle Generate OTP
  private generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }
   // handle Generate and Send OTP
  public async generateAndSendOTP(email: string): Promise<void> {
    const otp = this.generateOTP();
    await this.otpRepository.saveOTP(email, otp);
    await this.emailService.sendOtpEmail(email, otp);
  }
 // handle a verify Otp
  public async verifyOTP(email: string, otp: string): Promise<boolean> {
    return await this.otpRepository.verifyOTP(email, otp);
  }
}
