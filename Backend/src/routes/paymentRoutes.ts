import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
import { PaymentService } from "../services/paymentService";
import { PaymentRepository } from "../repositories/paymentReporitories";
import { EmailService } from "../services/emailService";

const router = Router();

const paymentRepository = new PaymentRepository();
const emailService = new EmailService();
const paymentService = new PaymentService(paymentRepository, emailService);
const paymentController = new PaymentController(paymentService);

router.post("/capturePayment", (req, res) => paymentController.processPaymentCapture(req, res));
router.post("/verifyPayment", (req, res) => paymentController.processPaymentVerification(req, res));

export default router;
