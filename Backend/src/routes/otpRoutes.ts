import { OTPController } from "../controllers/otpcontroller";
import { OTPService } from "../services/otpService";
import { EmailService } from "../services/emailService";
import { Router } from "express";

const emailService = new EmailService();
const otpService = new OTPService();
const otpController = new OTPController(otpService, emailService);

const router = Router()
router.post("/send-otp", otpController.sendOTP);
router.post("/verify-otp", otpController.verifyOTP);

export default router;