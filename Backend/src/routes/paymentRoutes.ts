import express from "express";
import PaymentService from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/capturePayment", PaymentService.capturePayment);
router.post("/verifyPayment", PaymentService.verifyPayment);

export default router;
