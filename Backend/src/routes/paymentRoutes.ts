import express from "express";
import { capturePayment, verifyPayment } from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/capturePayment", capturePayment);
router.post("/verifyPayment", verifyPayment);

export default router;
