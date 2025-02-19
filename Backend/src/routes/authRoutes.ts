import { Router } from "express";
import { AuthenticationController } from "../controllers/authController";
import { EmailService } from "../services/emailService";
import { RegistrationService } from "../services/registrationService";
import { LoginService } from "../services/loginService";
import { PasswordChangeService } from "../services/passwordChangeService";


const emailService = new EmailService();
const registrationService = new RegistrationService(emailService);
const loginService = new LoginService();
const passwordChangeService = new PasswordChangeService();


const authController = new AuthenticationController(
  registrationService,
  loginService,
  passwordChangeService
);


const router = Router();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/change-password", (req, res) => authController.changePassword(req, res));

export default router;
