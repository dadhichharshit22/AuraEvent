import nodemailer from "nodemailer";
import { EmailService } from "../services/emailService";
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

jest.mock("nodemailer");

describe("EmailService", () => {
  let emailService: EmailService;
  let sendMailMock: jest.Mock;

  beforeAll(() => {
    sendMailMock = jest.fn().mockResolvedValue(true);
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    emailService = new EmailService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send a welcome email", async () => {
    const name = "John Doe";
    const email = "johndoe@example.com";

    await emailService.sendWelcomeEmail(name, email);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: email,
        subject: "Welcome to Event Management",
        html: userRegistrationTemplate(name),
      })
    );
  });

  it("should send an OTP email", async () => {
    const email = "johndoe@example.com";
    const otp = "123456";

    await emailService.sendOTPEmail(email, otp);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: email,
        subject: "Your OTP Code",
        html: otpTemplate(otp),
      })
    );
  });

  it("should send an event creation email", async () => {
    const email = "johndoe@example.com";
    const title = "New Event";
    const date = "2025-02-20";
    const description = "This is a description of the new event.";

    await emailService.sendEventCreationEmail(email, title, date, description);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: email,
        subject: "Event Created",
        html: eventNotificationTemplate(title, date, description),
      })
    );
  });

  it("should send a new event notification email", async () => {
    const email = "johndoe@example.com";
    const title = "Exciting New Event";
    const date = "2025-03-15";
    const description = "Don't miss out on this exciting event!";

    await emailService.sendNewEventNotification(
      email,
      title,
      date,
      description
    );

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: email,
        subject: "New Event Added to EventManage!",
        html: newEventNotification(title, date, description),
      })
    );
  });

  it("should send an event registration email", async () => {
    const email = "johndoe@example.com";
    const title = "Awesome Event";
    const date = "2025-04-10";

    await emailService.sendEventRegistrationEmail(email, title, date);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: email,
        subject: "Event Registration Confirmation",
        html: registrationEmailTemplate(title, date),
      })
    );
  });

  it("should send an event unregistration email", async () => {
    const email = "johndoe@example.com";
    const title = "Awesome Event";
    const date = "2025-04-10";

    await emailService.sendEventUnregistrationEmail(email, title, date);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: email,
        subject: "Event Unregistration Confirmation",
        html: unregistrationEmailTemplate(title, date),
      })
    );
  });

  it("should send a payment success email", async () => {
    const email = "johndoe@example.com";
    const eventTitle = "Concert";
    const amount = 100;
    const transactionId = "txn123";
    const paymentDate = "2025-02-18";

    await emailService.sendPaymentSuccessEmail(
      email,
      eventTitle,
      amount,
      transactionId,
      paymentDate
    );

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: email,
        subject: "Payment Successful",
        html: paymentSuccessTemplate(
          eventTitle,
          amount,
          transactionId,
          paymentDate
        ),
      })
    );
  });

  it("should send a payment failure email", async () => {
    const email = "johndoe@example.com";
    const eventTitle = "Concert";
    const amount = 100;
    const errorMessage = "Payment declined";

    await emailService.sendPaymentFailureEmail(
      email,
      eventTitle,
      amount,
      errorMessage
    );

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: email,
        subject: "Payment Failed",
        html: paymentFailureTemplate(eventTitle, amount, errorMessage),
      })
    );
  });
});
