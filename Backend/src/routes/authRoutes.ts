import { Router } from "express";
import { authentication } from "../controllers/authController";
import { EmailService } from "../services/emailService";

const router = Router();
const emailService = new EmailService();
const authController = new authentication(emailService);


router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/change-password",authController.changePassword);

export default router;