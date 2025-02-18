// routes/paymentRoutes.ts
import express from "express";
import PaymentService from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Route for capturing payment
router.post("/capture-payment", authMiddleware, PaymentService.capturePayment);

// Route for verifying payment
router.post("/verify-payment", authMiddleware, PaymentService.verifyPayment);

export default router;
