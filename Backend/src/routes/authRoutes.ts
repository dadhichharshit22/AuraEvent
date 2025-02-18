import { Router } from 'express';
import { AuthenticationService } from '../controllers/authController';
import { EmailService } from '../services/emailService';

// Initialize services and controllers
const emailService = new EmailService();
const authService = new AuthenticationService(emailService);

// Initialize the router
const router = Router();

// Define the authentication routes
router.post('/register', authService.register);
router.post('/login', authService.login);
router.post('/change-password', authService.changePassword);

export default router;
