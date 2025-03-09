import { Router } from "express";
import { OneTimePasswordController } from "../controllers/otpcontroller";
import { OTPService } from "../services/otpService";
import { EmailService } from "../services/emailService";
import { OTPRepository } from "../repositories/otpRepositories";

const router = Router();

const emailService = new EmailService();
const otpRepository = new OTPRepository();
const otpService = new OTPService(otpRepository, emailService);
const otpController = new OneTimePasswordController(otpService);


router.post("/request-otp", (req, res) => otpController.sendOneTimePassword(req, res));
router.post("/verify-otp", (req, res) => otpController.validateOneTimePassword(req, res));

export default router;
