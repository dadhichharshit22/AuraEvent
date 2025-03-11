import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
import { PaymentService } from "../services/paymentService";
import { PaymentRepository } from "../repositories/paymentReporitories";
import { EmailService } from "../services/emailService";
import { EventAttendeeService } from "../services/eventAttendeeService";
import { UserRepository } from "../repositories/userRepositories";
import { EventRepository } from "../repositories/eventAttendeeRepositories";

const router = Router();


const paymentRepository = new PaymentRepository();
const emailService = new EmailService();
const userRepository = new UserRepository();
const eventAttendeeRepository = new EventRepository();


const eventAttendeeService = new EventAttendeeService(eventAttendeeRepository);


const paymentService = new PaymentService(paymentRepository, eventAttendeeService, emailService, userRepository);


const paymentController = new PaymentController(paymentService);


router.post("/capturePayment", (req, res) => paymentController.capturePayment(req, res));
router.post("/verifyPayment", (req, res) => paymentController.verifyPayment(req, res));

export default router;
