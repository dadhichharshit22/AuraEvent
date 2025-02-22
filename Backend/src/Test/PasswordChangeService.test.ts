import { PasswordChangeService } from "../services/passwordChangeService";
import User from "../models/userModal";
import { PasswordHelper } from "../utils/passwordHelper";
import { Request, Response } from "express";

jest.mock("../models/userModal");
jest.mock("../utils/passwordHelper");

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
    mockRequest.body = {
      password: "newpassword",
      confirmPassword: "newpassword",
    };

    await passwordChangeService.changePassword(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "Missing required fields: email",
    });
  });

  it("should return an error if passwords don't match", async () => {
    mockRequest.body = {
      password: "newpassword",
      confirmPassword: "differentpassword",
      email: "test@example.com",
    };

    await passwordChangeService.changePassword(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "Passwords don't match.",
    });
  });

  it("should return an error if user is not found", async () => {
    mockRequest.body = {
      password: "newpassword",
      confirmPassword: "newpassword",
      email: "test@example.com",
    };
    (User.findOne as jest.Mock).mockResolvedValueOnce(null);

    await passwordChangeService.changePassword(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found.",
    });
  });

  it("should update the user's password successfully", async () => {
    mockRequest.body = {
      password: "newpassword",
      confirmPassword: "newpassword",
      email: "test@example.com",
    };
    const user = { email: "test@example.com", password: "oldpassword" };
    const hashedPassword = "hashedpassword";

    (User.findOne as jest.Mock).mockResolvedValueOnce(user);
    (PasswordHelper.hashPassword as jest.Mock).mockResolvedValueOnce(
      hashedPassword
    );
    (User.updateOne as jest.Mock).mockResolvedValueOnce({ nModified: 1 });

    await passwordChangeService.changePassword(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(User.updateOne).toHaveBeenCalledWith(
      { email: "test@example.com" },
      { password: hashedPassword }
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      message: "Password reset successfully.",
    });
  });

  it("should handle errors during password reset", async () => {
    mockRequest.body = {
      password: "newpassword",
      confirmPassword: "newpassword",
      email: "test@example.com",
    };
    const errorMessage = "Database error";

    (User.findOne as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await passwordChangeService.changePassword(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: "Server error during password reset.",
    });
  });
});
