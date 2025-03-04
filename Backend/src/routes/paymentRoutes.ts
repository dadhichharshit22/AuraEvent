import express from "express";
import PaymentService from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { EmailService } from "../services/emailService";

const router = express.Router();
const emailService = new EmailService(); 
const paymentService = new PaymentService(emailService); 


router.post(
  "/capturePayment",
  authMiddleware,
  paymentService.processPaymentCapture.bind(paymentService)
);
router.post(
  "/verifyPayment",
  authMiddleware,
  paymentService.processPaymentVerification.bind(paymentService)
);

export default router;
