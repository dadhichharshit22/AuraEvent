// routes/otpRoutes.ts
import { Router } from "express";
import { OTPController } from "../controllers/otpcontroller";
import { EmailService } from "../services/emailService";

const router = Router();
const emailService = new EmailService();
const otpController = new OTPController(emailService);

// Route for sending OTP
router.post("/send-otp", otpController.sendOTP);

// Route for verifying OTP
router.post("/verify-otp", otpController.verifyOTP);

export default router;
