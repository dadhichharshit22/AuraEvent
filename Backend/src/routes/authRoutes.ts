import { Router } from "express";
import { AuthenticationController } from "../controllers/authController";
import { EmailService } from "../services/emailService";
import { RegistrationService } from "../services/RegistrationService";
import { LoginService } from "../services/LoginService";
import { PasswordChangeService } from "../services/PasswordChangeService";

// Initialize the required services
const emailService = new EmailService();
const registrationService = new RegistrationService(emailService);
const loginService = new LoginService();
const passwordChangeService = new PasswordChangeService();

// Initialize the AuthenticationController with the services
const authController = new AuthenticationController(
  registrationService,
  loginService,
  passwordChangeService
);

// Create the router and define routes
const router = Router();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/change-password", (req, res) => authController.changePassword(req, res));

export default router;
