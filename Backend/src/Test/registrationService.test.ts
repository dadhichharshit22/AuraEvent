import { Request, Response } from "express";
import { RegistrationService } from "../services/registrationService";
import { EmailService } from "../services/emailService";
import { PasswordHelper } from "../utils/passwordHelper";
import User from "../models/userModal";
import jwt from "jsonwebtoken";

jest.mock("../models/userModal");
jest.mock("../services/emailService");
jest.mock("../utils/passwordHelper");

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("RegistrationService", () => {
  let registrationService: RegistrationService;
  let mockEmailService: EmailService;

  beforeEach(() => {
    mockEmailService = new EmailService();
    registrationService = new RegistrationService(mockEmailService);
  });

  it("should return an error if required fields are missing", async () => {
    const req = {
      body: { email: "test@example.com", password: "password123" },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await registrationService.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Missing required fields: name, phoneNumber, username",
    });
  });

  it("should return an error if email is already registered", async () => {
    const req = {
      body: {
        name: "Test User",
        email: "test@example.com",
        phoneNumber: "1234567890",
        password: "password123",
        username: "testuser",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (User.findOne as jest.Mock).mockResolvedValueOnce({
      email: "test@example.com",
    });

    await registrationService.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Email already registered.",
    });
  });

  it("should return an error if username is already taken", async () => {
    const req = {
      body: {
        name: "Test User",
        email: "unique@example.com",
        phoneNumber: "1234567890",
        password: "password123",
        username: "testuser",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (User.findOne as jest.Mock).mockResolvedValueOnce({ username: "testuser" });

    await registrationService.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Username already taken.",
    });
  });

  it("should register a new user successfully", async () => {
    const req = {
      body: {
        name: "Test User",
        email: "unique@example.com",
        phoneNumber: "1234567890",
        password: "password123",
        username: "testuser",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (User.findOne as jest.Mock).mockResolvedValueOnce(null);
    (PasswordHelper.hashPassword as jest.Mock).mockResolvedValueOnce(
      "hashedpassword"
    );
    (User.create as jest.Mock).mockResolvedValueOnce({
      id: "1234",
      name: "Test User",
      email: "unique@example.com",
      username: "testuser",
    });

    (jwt.sign as jest.Mock).mockReturnValue("token");

    (mockEmailService.sendWelcomeEmail as jest.Mock).mockResolvedValueOnce(
      undefined
    );

    await registrationService.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      token: "token",
    });
    expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(
      "Test User",
      "unique@example.com"
    );
  });

  it("should handle server errors during registration", async () => {
    const req = {
      body: {
        name: "Test User",
        email: "unique@example.com",
        phoneNumber: "1234567890",
        password: "password123",
        username: "testuser",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (User.create as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    await registrationService.register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Server error during registration.",
    });
  });
});
