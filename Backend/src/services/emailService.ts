import nodemailer from "nodemailer";
import { userRegistrationTemplate } from "../emailTemplate/userRegistration";
import { otpTemplate } from "../emailTemplate/otpTemplates";
import { eventNotificationTemplate } from "../emailTemplate/eventNotification";
import {
  registrationEmailTemplate,
  unregistrationEmailTemplate,
} from "../emailTemplate/eventRegistration";
import { newEventNotification } from "../emailTemplate/newEventNotification";
import {
  paymentSuccessTemplate,
  paymentFailureTemplate,
} from "../emailTemplate/paymentTemplates";

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = this.initializeTransporter();
  }

  /**
   * Initializes the email transporter using Nodemailer.
   * Uses Gmail service with credentials from environment variables.
   */
  private initializeTransporter() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "default@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "defaultpassword",
      },
    });
  }

  /**
   * Sends an email with the provided subject and content.
   * Throws an error if the email fails to send.
   */
  private async sendEmail(recipientEmail: string, subject: string, content: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER || "default@gmail.com",
        to: recipientEmail,
        subject,
        html: content,
      });
    } catch (error) {
      console.error(`Failed to send email to ${recipientEmail}:`, error);
      throw new Error("Email delivery failed.");
    }
  }

  /**
   * Sends an email to multiple recipients using the provided content generator.
   * Useful for sending event notifications to multiple users.
   */
  async notifyRecipients(
    recipientEmails: string[],
    subject: string,
    contentGenerator: (eventTitle: string, eventDate: string, eventDescription?: string) => string,
    eventTitle: string,
    eventDate: string,
    eventDescription?: string
  ): Promise<void> {
    await Promise.all(
      recipientEmails.map((recipientEmail) =>
        this.sendEmail(recipientEmail, subject, contentGenerator(eventTitle, eventDate, eventDescription))
      )
    );
  }

  /**
   * Sends a welcome email to a newly registered user.
   */
  async sendWelcomeEmail(userName: string, recipientEmail: string): Promise<void> {
    await this.sendEmail(recipientEmail, "Welcome to Event Management", userRegistrationTemplate(userName));
  }

  /**
   * Sends an OTP email for user verification.
   */
  async sendOtpEmail(recipientEmail: string, otpCode: string): Promise<void> {
    await this.sendEmail(recipientEmail, "Your OTP Code", otpTemplate(otpCode));
  }

  /**
   * Sends a general event-related email.
   * This method helps reuse email-sending logic for different event notifications.
   */
  async notifyEvent(recipientEmail: string, subject: string, content: string): Promise<void> {
    await this.sendEmail(recipientEmail, subject, content);
  }

  /**
   * Sends an email notifying users about a newly created event.
   */
  async notifyEventCreation(recipientEmail: string, eventTitle: string, eventDate: string, eventDescription: string): Promise<void> {
    await this.notifyEvent(recipientEmail, "Event Created", eventNotificationTemplate(eventTitle, eventDate, eventDescription));
  }

  /**
   * Sends an email notification about a newly added event.
   */
  async notifyNewEvent(recipientEmail: string, eventTitle: string, eventDate: string, eventDescription: string): Promise<void> {
    await this.notifyEvent(recipientEmail, "New Event Added to EventManage!", newEventNotification(eventTitle, eventDate, eventDescription));
  }

  /**
   * Confirms an event registration to the user.
   */
  async confirmRegistration(recipientEmail: string, eventTitle: string, eventDate: string): Promise<void> {
    await this.notifyEvent(recipientEmail, "Event Registration Confirmation", registrationEmailTemplate(eventTitle, eventDate));
  }

  /**
   * Confirms an event unregistration to the user.
   */
  async confirmUnregistration(recipientEmail: string, eventTitle: string, eventDate: string): Promise<void> {
    await this.notifyEvent(recipientEmail, "Event Unregistration Confirmation", unregistrationEmailTemplate(eventTitle, eventDate));
  }

  /**
   * Notifies users about updates to an event.
   */
  async notifyEventUpdate(recipientEmail: string, eventTitle: string, eventDate: string, eventDescription: string): Promise<void> {
    await this.notifyEvent(recipientEmail, "Event Updated", eventNotificationTemplate(eventTitle, eventDate, eventDescription));
  }

  /**
   * Sends a general payment-related email.
   */
  async sendPaymentEmail(recipientEmail: string, subject: string, content: string): Promise<void> {
    await this.sendEmail(recipientEmail, subject, content);
  }

  /**
   * Sends an email confirming successful payment for an event.
   */
  async sendPaymentSuccessEmail(recipientEmail: string, eventTitle: string, amount: number, transactionId: string, paymentDate: string): Promise<void> {
    const content = paymentSuccessTemplate(eventTitle, amount, transactionId, paymentDate);
    await this.sendPaymentEmail(recipientEmail, "Payment Successful", content);
  }

  /**
   * Sends an email notifying a payment failure.
   */
  async sendPaymentFailureEmail(recipientEmail: string, eventTitle: string, amount: number, errorMessage: string): Promise<void> {
    const content = paymentFailureTemplate(eventTitle, amount, errorMessage);
    await this.sendPaymentEmail(recipientEmail, "Payment Failed", content);
  }
}
