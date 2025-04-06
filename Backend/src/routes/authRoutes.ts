import { Router } from "express";
import { AuthenticationController } from "../controllers/authController";
import { AuthService } from "../services/authService";
import { AuthRepository } from "../repositories/authRepositories";
import { authenticateUser } from "../middlewares/cookieMiddleware";
import { Request, Response, NextFunction } from "express";

const userRepository = new AuthRepository();
const authService = new AuthService(userRepository);
const authController = new AuthenticationController(authService);

const router = Router();

// Define a type for request handlers to avoid TypeScript errors
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Middleware to handle async errors
const asyncHandler = (fn: AsyncRequestHandler) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Public routes
router.post("/register", asyncHandler(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  await authController.register(req, res);
}));

router.post("/login", asyncHandler(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  await authController.login(req, res);
}));

router.post("/set-cookie-consent", asyncHandler(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  await authController.setCookieConsent(req, res);
}));

// Add logout route
router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.json({ success: true, message: "Logged out successfully" });
});

// Protected routes (require authentication)
// Use type assertion to fix TypeScript error
router.post("/change-password", authenticateUser as any, asyncHandler(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  await authController.changePassword(req, res);
}));

// Protected Route (Example)
// Use type assertion to fix TypeScript error
router.get("/protected", authenticateUser as any, (req: Request, res: Response) => {
  res.json({ success: true, message: "You have access to this route!", user: req.user });
});

// Error handling middleware
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

export default router;
