import { Request, Response } from "express";
import { LoginService } from "../services/LoginService"; // Adjust the import path accordingly
import User from "../models/User";
import { PasswordHelper } from "../utils/passwordHelper";
import jwt from "jsonwebtoken";

// Mocking the dependencies
jest.mock("../models/User");
jest.mock("../utils/passwordHelper");
jest.mock("jsonwebtoken");

describe("LoginService", () => {
  let loginService: LoginService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    loginService = new LoginService();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return error if required fields are missing", async () => {
    mockRequest.body = { email: "", password: "" };

    await loginService.login(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "Missing required fields: email, password",
    });
  });

  it("should return error if user not found", async () => {
    mockRequest.body = { email: "test@example.com", password: "password123" };
    User.findOne = jest.fn().mockResolvedValue(null); // Mocking User.findOne to return null

    await loginService.login(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid credentials.",
    });
  });

  it("should return error if password is invalid", async () => {
    mockRequest.body = { email: "test@example.com", password: "password123" };
    const user = { id: "1", email: "test@example.com", password: "hashedpassword" };
    User.findOne = jest.fn().mockResolvedValue(user); // Mocking User.findOne to return a user
    PasswordHelper.comparePasswords = jest.fn().mockResolvedValue(false); // Mocking password check to return false

    await loginService.login(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid credentials.",
    });
  });

  it("should return token if login is successful", async () => {
    mockRequest.body = { email: "test@example.com", password: "password123" };
    const user = { id: "1", email: "test@example.com", password: "hashedpassword" };
    User.findOne = jest.fn().mockResolvedValue(user); // Mocking User.findOne to return a user
    PasswordHelper.comparePasswords = jest.fn().mockResolvedValue(true); // Mocking password check to return true
    jwt.sign = jest.fn().mockReturnValue("mocked_token"); // Mocking JWT signing

    await loginService.login(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      token: "mocked_token",
    });
  });

  it("should handle server errors gracefully", async () => {
    mockRequest.body = { email: "test@example.com", password: "password123" };
    User.findOne = jest.fn().mockRejectedValue(new Error("Database error")); // Simulating a database error

    await loginService.login(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "Server error during login.",
    });
  });
});
