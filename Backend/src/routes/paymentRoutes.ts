import express from "express";
import PaymentService from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { EmailService } from "../services/emailService";

const router = express.Router();
const emailService = new EmailService(); // instance of emailService
const paymentService = new PaymentService(emailService); // instance of paymentService

//
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
