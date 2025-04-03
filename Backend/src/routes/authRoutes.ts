import { Router } from "express";
import { AuthenticationController } from "../controllers/authController";
import { AuthService } from "../services/authService";
import { AuthRepository } from "../repositories/authRepositories";
import { authenticateUser, checkCookieConsent } from "../middlewares/cookieMiddleware";

const userRepository = new AuthRepository();
const authService = new AuthService(userRepository);
const authController = new AuthenticationController(authService);

const router = Router();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/change-password", (req, res) => authController.changePassword(req, res));
router.post("/set-cookie-consent", (req, res) => authController.setCookieConsent(req, res));
// Protected Route (Example)
router.get("/protected", authenticateUser, (req, res) => {
    res.json({ success: true, message: "You have access to this route!" });
  });

export default router;
