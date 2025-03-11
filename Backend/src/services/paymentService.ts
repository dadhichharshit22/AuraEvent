import { PaymentRepository } from "../repositories/paymentReporitories";
import { EventAttendeeService, EventNotFoundError, UserAlreadyRegisteredError } from "../services/eventAttendeeService";
import { EmailService } from "../services/emailService";
import { UserRepository } from "../repositories/userRepositories";




 // Service responsible for handling payment operations.

export class PaymentService {
  constructor(
    private paymentRepository: PaymentRepository,
    private eventAttendeeService: EventAttendeeService,
    private emailService: EmailService,
    private userRepository: UserRepository
  ) {}

  
   // Initiates payment capture for an event registration.
   
  public async capturePayment(eventId: string, userId: string): Promise<string> {
    if (!eventId || !userId) {
      throw new PaymentProcessingError("Event ID and User ID are required.");
    }

    try {
      await this.eventAttendeeService.registerAttendee(eventId, userId);
    } catch (error) {
      if (error instanceof EventNotFoundError || error instanceof UserAlreadyRegisteredError) {
        throw error;
      }
      throw new PaymentProcessingError("Unexpected error during attendee registration.");
    }

    const event = await this.paymentRepository.findEventById(eventId);
    if (!event) throw new EventNotFoundError();

    const totalAmount = event.price || 0;

    // Ensure we only return the payment order ID
    const paymentOrder = await this.paymentRepository.createPaymentOrder(totalAmount);
    return paymentOrder.id;  // Assuming `id` exists in the returned object
  }

  
   // Verifies payment and registers the user as an attendee.
   
  public async verifyPayment(orderId: string, paymentId: string, signature: string, eventId: string, userId: string): Promise<void> {
    if (!orderId || !paymentId || !signature || !eventId || !userId) {
      throw new PaymentVerificationError();
    }

    const isVerified = this.paymentRepository.verifyPaymentSignature(orderId, paymentId, signature);
    if (!isVerified) {
      throw new PaymentVerificationError();
    }

    await this.eventAttendeeService.registerAttendee(eventId, userId);

    // Fetch event and user details for email
    const event = await this.paymentRepository.findEventById(eventId);
    const user = await this.userRepository.findById(userId);
    if (!event || !user) throw new Error("Event or user not found.");

    await this.emailService.sendPaymentSuccessEmail(
      user.email,
      event.title,
      event.price,
      paymentId,
      new Date().toISOString()
    );
  }
}


 // Custom error for payment verification failures.
 
class PaymentVerificationError extends Error {
  constructor() {
    super("Payment verification failed.");
    this.name = "PaymentVerificationError";
  }
}


 // Custom error for payment processing failures.
 
class PaymentProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaymentProcessingError";
  }
}
