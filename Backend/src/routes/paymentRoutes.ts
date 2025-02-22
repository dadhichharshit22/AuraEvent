import express from "express";
import PaymentService from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { EmailService } from "../services/emailService";

const router = express.Router();
const emailService = new EmailService(); // Create an instance of EmailService
const paymentService = new PaymentService(emailService); // Pass emailService to PaymentService

router.post(
  "/capturePayment",
  authMiddleware,
  paymentService.capturePayment.bind(paymentService)
);
router.post(
  "/verifyPayment",
  authMiddleware,
  paymentService.verifyPayment.bind(paymentService)
);

export default router;
