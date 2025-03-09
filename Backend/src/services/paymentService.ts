import { PaymentRepository } from "../repositories/paymentReporitories";
import EventAttendeeService from "../services/eventAttendeeService";
import { EmailService } from "../services/emailService";

export class PaymentService {
  constructor(
    private paymentRepository: PaymentRepository,
    private emailService: EmailService
  ) {}

  public async capturePayment(eventId: string, userId: string) {
    if (!eventId || !userId) {
      throw new Error("Invalid request: Event ID and User ID are required.");
    }

    const event = await this.paymentRepository.findEventById(eventId);
    if (!event) {
      throw new Error("Event not found.");
    }

    if (EventAttendeeService.isUserRegistered(event, userId)) {
      throw new Error("User is already registered.");
    }

    const totalAmount = event.price || 0;
    return await this.paymentRepository.createPaymentOrder(totalAmount);
  }

  public async verifyPayment(orderId: string, paymentId: string, signature: string, eventId: string, userId: string) {
    if (!orderId || !paymentId || !signature || !eventId || !userId) {
      throw new Error("Invalid payment verification request.");
    }

    if (!this.paymentRepository.verifyPaymentSignature(orderId, paymentId, signature)) {
      throw new Error("Payment verification failed.");
    }

    return await EventAttendeeService.addAttendee(eventId, userId);
  }
}
