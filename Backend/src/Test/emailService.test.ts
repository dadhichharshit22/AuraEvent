import nodemailer from "nodemailer";
import { EmailService } from "../services/emailService";
import { userRegistrationTemplate } from "../emailTemplate/userRegistration";
import { otpTemplate } from "../emailTemplate/otpTemplates";
import { eventNotificationTemplate } from "../emailTemplate/eventNotification";
import { registrationEmailTemplate, unregistrationEmailTemplate } from "../emailTemplate/eventRegistration";
import { newEventNotification } from "../emailTemplate/newEventNotification";
import { paymentSuccessTemplate, paymentFailureTemplate } from "../emailTemplate/paymentTemplates";

jest.mock("nodemailer");

describe("EmailService", () => {
  let emailService: EmailService;
  let sendMailMock: jest.Mock;

  beforeEach(() => {
    sendMailMock = jest.fn();
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    emailService = new EmailService();
  });

  describe("sendEmail", () => {
    it("should send an email successfully", async () => {
      sendMailMock.mockResolvedValueOnce({});

      await emailService["sendEmail"]("test@example.com", "Test Subject", "<p>Test Content</p>");

      expect(sendMailMock).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER || "default@gmail.com",
        to: "test@example.com",
        subject: "Test Subject",
        html: "<p>Test Content</p>",
      });
    });

    it("should throw an error if email sending fails", async () => {
      sendMailMock.mockRejectedValueOnce(new Error("SMTP Error"));

      await expect(emailService["sendEmail"]("test@example.com", "Test Subject", "<p>Test Content</p>"))
        .rejects.toThrow("Email delivery failed.");
    });
  });

  describe("sendWelcomeEmail", () => {
    it("should send a welcome email", async () => {
      sendMailMock.mockResolvedValueOnce({});
      await emailService.sendWelcomeEmail("John Doe", "john@example.com");

      expect(sendMailMock).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER || "default@gmail.com",
        to: "john@example.com",
        subject: "Welcome to Event Management",
        html: userRegistrationTemplate("John Doe"),
      });
    });
  });

  describe("sendOtpEmail", () => {
    it("should send an OTP email", async () => {
      sendMailMock.mockResolvedValueOnce({});
      await emailService.sendOtpEmail("user@example.com", "123456");

      expect(sendMailMock).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER || "default@gmail.com",
        to: "user@example.com",
        subject: "Your OTP Code",
        html: otpTemplate("123456"),
      });
    });
  });

  describe("notifyEventCreation", () => {
    it("should send an event creation notification", async () => {
      sendMailMock.mockResolvedValueOnce({});
      await emailService.notifyEventCreation("user@example.com", "Event Title", "2025-05-10", "Event Description");

      expect(sendMailMock).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER || "default@gmail.com",
        to: "user@example.com",
        subject: "Event Created",
        html: eventNotificationTemplate("Event Title", "2025-05-10", "Event Description"),
      });
    });
  });

  describe("confirmRegistration", () => {
    it("should send an event registration confirmation", async () => {
      sendMailMock.mockResolvedValueOnce({});
      await emailService.confirmRegistration("user@example.com", "Event Title", "2025-05-10");

      expect(sendMailMock).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER || "default@gmail.com",
        to: "user@example.com",
        subject: "Event Registration Confirmation",
        html: registrationEmailTemplate("Event Title", "2025-05-10"),
      });
    });
  });

  describe("confirmUnregistration", () => {
    it("should send an event unregistration confirmation", async () => {
      sendMailMock.mockResolvedValueOnce({});
      await emailService.confirmUnregistration("user@example.com", "Event Title", "2025-05-10");

      expect(sendMailMock).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER || "default@gmail.com",
        to: "user@example.com",
        subject: "Event Unregistration Confirmation",
        html: unregistrationEmailTemplate("Event Title", "2025-05-10"),
      });
    });
  });

  describe("sendPaymentSuccessEmail", () => {
    it("should send a payment success email", async () => {
      sendMailMock.mockResolvedValueOnce({});
      await emailService.sendPaymentSuccessEmail("user@example.com", "Event Title", 50, "TXN12345", "2025-03-11");

      expect(sendMailMock).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER || "default@gmail.com",
        to: "user@example.com",
        subject: "Payment Successful",
        html: paymentSuccessTemplate("Event Title", 50, "TXN12345", "2025-03-11"),
      });
    });
  });

  describe("sendPaymentFailureEmail", () => {
    it("should send a payment failure email", async () => {
      sendMailMock.mockResolvedValueOnce({});
      await emailService.sendPaymentFailureEmail("user@example.com", "Event Title", 50, "Payment failed due to insufficient funds.");

      expect(sendMailMock).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER || "default@gmail.com",
        to: "user@example.com",
        subject: "Payment Failed",
        html: paymentFailureTemplate("Event Title", 50, "Payment failed due to insufficient funds."),
      });
    });
  });
});
