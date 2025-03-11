import { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";

/**
 * Mocks for dependencies
 */
const mockUserService = {
  getUserById: jest.fn(),
} as unknown as UserService;

const userController = new UserController(mockUserService);

/**
 * Helper function to create a mock response object.
 */
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};

/**
 * Test cases for UserController
 */
describe("UserController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = mockResponse();
    jest.clearAllMocks();
  });

  test("should return 400 if user ID is missing", async () => {
    await userController.getUserProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "User ID is required" });
  });

  test("should return user details if user exists", async () => {
    const mockUser = {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      password: "hashedPassword",
      username: "johndoe",
      role: "user",
      phoneNumber: 1234567890, // Ensure correct phoneNumber type
    };

    req = { user: { id: "123" } };
    mockUserService.getUserById = jest.fn().mockResolvedValue(mockUser);

    await userController.getUserProfile(req as Request, res as Response);

    expect(mockUserService.getUserById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test("should return 404 if user is not found", async () => {
    req = { user: { id: "999" } };
    mockUserService.getUserById = jest.fn().mockResolvedValue(null);

    await userController.getUserProfile(req as Request, res as Response);

    expect(mockUserService.getUserById).toHaveBeenCalledWith("999");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  test("should return 500 if an unexpected error occurs", async () => {
    req = { user: { id: "123" } };
    mockUserService.getUserById = jest.fn().mockRejectedValue(new Error("Database connection failed"));

    await userController.getUserProfile(req as Request, res as Response);

    expect(mockUserService.getUserById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
      error: "Database connection failed",
    });
  });
});
