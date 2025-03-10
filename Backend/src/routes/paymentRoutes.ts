import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
import { PaymentService } from "../services/paymentService";
import { PaymentRepository } from "../repositories/paymentReporitories";
import { EmailService } from "../services/emailService";
import { EventAttendeeService } from "../services/eventAttendeeService";
import { UserRepository } from "../repositories/userRepositories";
import { EventRepository } from "../repositories/eventAttendeeRepositories";

const router = Router();

// Initialize repositories
const paymentRepository = new PaymentRepository();
const emailService = new EmailService();
const userRepository = new UserRepository();
const eventRepository = new EventRepository();

// Initialize event attendee service with the correct event repository
const eventAttendeeService = new EventAttendeeService(eventRepository);

// Initialize payment service with necessary dependencies
const paymentService = new PaymentService(paymentRepository, eventAttendeeService, emailService, userRepository);

// Initialize payment controller
const paymentController = new PaymentController(paymentService);

// Define routes
router.post("/capturePayment", (req, res) => paymentController.capturePayment(req, res));
router.post("/verifyPayment", (req, res) => paymentController.verifyPayment(req, res));

export default router;
