// routes/otpRoutes.ts
import { Router } from "express";
import { OTPController } from "../controllers/otpcontroller";
import { EmailService } from "../services/emailService";

const router = Router();
const emailService = new EmailService();
const otpController = new OTPController(emailService);

router.post("/send-otp", async (req, res, next) => {
  try {
    console.log('OTP route hit with body:', req.body);
    await otpController.send(req, res);
  } catch (error) {
    console.error('Route error:', error);
    next(error);
  }
});

router.post("/verify-otp", async (req, res, next) => {
  try {
    await otpController.verify(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;