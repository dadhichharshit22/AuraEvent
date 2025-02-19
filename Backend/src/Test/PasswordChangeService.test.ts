import { PasswordChangeService } from "../services/PasswordChangeService";
import User from "../models/User";
import { PasswordHelper } from "../utils/passwordHelper";
import { Request, Response } from "express";

jest.mock("../models/User"); // Mock User model
jest.mock("../utils/passwordHelper"); // Mock PasswordHelper

describe("PasswordChangeService", () => {
  let passwordChangeService: PasswordChangeService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    passwordChangeService = new PasswordChangeService();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return an error if required fields are missing", async () => {
    mockRequest.body = { password: "newpassword", confirmPassword: "newpassword" }; // Missing email

    await passwordChangeService.changePassword(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "Missing required fields: email",
    });
  });

  it("should return an error if passwords don't match", async () => {
    mockRequest.body = { password: "newpassword", confirmPassword: "differentpassword", email: "test@example.com" };

    await passwordChangeService.changePassword(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "Passwords don't match.",
    });
  });

  it("should return an error if user is not found", async () => {
    mockRequest.body = { password: "newpassword", confirmPassword: "newpassword", email: "test@example.com" };
    (User.findOne as jest.Mock).mockResolvedValueOnce(null); // Simulate user not found

    await passwordChangeService.changePassword(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found.",
    });
  });

  it("should update the user's password successfully", async () => {
    mockRequest.body = { password: "newpassword", confirmPassword: "newpassword", email: "test@example.com" };
    const user = { email: "test@example.com", password: "oldpassword" }; // Mock user
    const hashedPassword = "hashedpassword"; // Mock hashed password

    (User.findOne as jest.Mock).mockResolvedValueOnce(user); // Simulate finding the user
    (PasswordHelper.hashPassword as jest.Mock).mockResolvedValueOnce(hashedPassword); // Mock password hashing
    (User.updateOne as jest.Mock).mockResolvedValueOnce({ nModified: 1 }); // Simulate successful password update

    await passwordChangeService.changePassword(mockRequest as Request, mockResponse as Response);

    expect(User.updateOne).toHaveBeenCalledWith({ email: "test@example.com" }, { password: hashedPassword });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      message: "Password reset successfully.",
    });
  });

  it("should handle errors during password reset", async () => {
    mockRequest.body = { password: "newpassword", confirmPassword: "newpassword", email: "test@example.com" };
    const errorMessage = "Database error";

    (User.findOne as jest.Mock).mockRejectedValueOnce(new Error(errorMessage)); // Simulate DB error

    await passwordChangeService.changePassword(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "Server error during password reset.",
    });
  });
});
