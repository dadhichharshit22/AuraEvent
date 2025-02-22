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
        user: process.env.EMAIL_USER || "dadhich.harshit222002@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "chvq cfvw neuo tanc",
      },
    });
  }

  private async sendMail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER || "dadhich.harshit222002@gmail.com",
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error("Failed to send email");
    }
  }

  async sendWelcomeEmail(name: string, email: string): Promise<void> {
    const html = userRegistrationTemplate(name);
    await this.sendMail(email, "Welcome to Event Management", html);
  }

  async sendOTPEmail(email: string, otp: string): Promise<void> {
    const html = otpTemplate(otp);
    await this.sendMail(email, "Your OTP Code", html);
  }

  async sendEventCreationEmail(
    email: string,
    title: string,
    date: string,
    description: string
  ): Promise<void> {
    const html = eventNotificationTemplate(title, date, description);
    await this.sendMail(email, "Event Created", html);
  }

  async sendNewEventNotification(
    email: string,
    title: string,
    date: string,
    description: string
  ): Promise<void> {
    const html = newEventNotification(title, date, description);
    await this.sendMail(email, "New Event Added to EventManage!", html);
  }

  async sendEventRegistrationEmail(
    email: string,
    title: string,
    date: string
  ): Promise<void> {
    const html = registrationEmailTemplate(title, date);
    await this.sendMail(email, "Event Registration Confirmation", html);
  }

  async sendEventUnregistrationEmail(
    email: string,
    title: string,
    date: string
  ): Promise<void> {
    const html = unregistrationEmailTemplate(title, date);
    await this.sendMail(email, "Event Unregistration Confirmation", html);
  }

  async sendEventUpdateEmail(
    email: string,
    title: string,
    date: string,
    description: string
  ): Promise<void> {
    const html = eventNotificationTemplate(title, date, description);
    await this.sendMail(email, "Event Updated", html);
  }

  async sendPaymentSuccessEmail(
    email: string,
    eventTitle: string,
    amount: number,
    transactionId: string,
    paymentDate: string
  ): Promise<void> {
    const html = paymentSuccessTemplate(
      eventTitle,
      amount,
      transactionId,
      paymentDate
    );
    await this.sendMail(email, "Payment Successful", html);
  }

  async sendPaymentFailureEmail(
    email: string,
    eventTitle: string,
    amount: number,
    errorMessage: string
  ): Promise<void> {
    const html = paymentFailureTemplate(eventTitle, amount, errorMessage);
    await this.sendMail(email, "Payment Failed", html);
  }
}
