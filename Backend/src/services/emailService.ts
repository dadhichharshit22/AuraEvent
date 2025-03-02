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
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn(
        "Warning: Email credentials are missing in environment variables."
      );
    }
  }

  private async sendEmail(
    recipient: string,
    subject: string,
    htmlContent: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${recipient} with subject: ${subject}`);
    } catch (error) {
      console.error(`Failed to send email to ${recipient}:`, error);
      throw new Error("Email delivery failed");
    }
  }

  async sendWelcomeEmail(name: string, email: string): Promise<void> {
    await this.sendEmail(
      email,
      "Welcome to Event Management",
      userRegistrationTemplate(name)
    );
  }

  async sendOTPEmail(email: string, otp: string): Promise<void> {
    await this.sendEmail(email, "Your OTP Code", otpTemplate(otp));
  }

  async sendEventCreationEmail(
    email: string,
    title: string,
    date: string,
    description: string
  ): Promise<void> {
    await this.sendEmail(
      email,
      "Event Created",
      eventNotificationTemplate(title, date, description)
    );
  }

  async sendNewEventNotification(
    email: string,
    title: string,
    date: string,
    description: string
  ): Promise<void> {
    await this.sendEmail(
      email,
      "New Event Added to EventManage!",
      newEventNotification(title, date, description)
    );
  }

  async sendEventRegistrationEmail(
    email: string,
    title: string,
    date: string
  ): Promise<void> {
    await this.sendEmail(
      email,
      "Event Registration Confirmation",
      registrationEmailTemplate(title, date)
    );
  }

  async sendEventUnregistrationEmail(
    email: string,
    title: string,
    date: string
  ): Promise<void> {
    await this.sendEmail(
      email,
      "Event Unregistration Confirmation",
      unregistrationEmailTemplate(title, date)
    );
  }

  async sendEventUpdateEmail(
    email: string,
    title: string,
    date: string,
    description: string
  ): Promise<void> {
    await this.sendEmail(
      email,
      "Event Updated",
      eventNotificationTemplate(title, date, description)
    );
  }

  async sendPaymentSuccessEmail(
    email: string,
    eventTitle: string,
    amount: number,
    transactionId: string,
    paymentDate: string
  ): Promise<void> {
    await this.sendEmail(
      email,
      "Payment Successful",
      paymentSuccessTemplate(eventTitle, amount, transactionId, paymentDate)
    );
  }

  async sendPaymentFailureEmail(
    email: string,
    eventTitle: string,
    amount: number,
    errorMessage: string
  ): Promise<void> {
    await this.sendEmail(
      email,
      "Payment Failed",
      paymentFailureTemplate(eventTitle, amount, errorMessage)
    );
  }
}
