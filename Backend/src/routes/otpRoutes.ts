import { OTPService } from "../services/otpService";
import { OTPController } from "../controllers/otpcontroller";
import { EmailService } from "../services/emailService";
import { Router } from "express";

const emailService = new EmailService();
const otpService = new OTPService();
const otpController = new OTPController(otpService, emailService);

const router = Router();

router.post("/send-otp", otpController.sendOtp);

router.post("/verify-otp", otpController.verifyOtp);

export default router;
