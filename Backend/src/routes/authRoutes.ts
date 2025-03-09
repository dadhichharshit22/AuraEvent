import { Router } from "express";
import { AuthenticationController } from "../controllers/authController";
import { AuthService } from "../services/authService";
import { UserRepository } from "../repositories/authRepositories";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthenticationController(authService);

const router = Router();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/change-password", (req, res) => authController.changePassword(req, res));

export default router;
