import { UserService } from "../services/UserService";
import User from "../models/User";

// Mock the User model
jest.mock("../models/User");

describe("UserService", () => {
  it("should return a user when the user exists", async () => {
    const mockUser = {
      id: "1234",
      name: "Test User",
      email: "test@example.com",
      password: "hashedPassword", // The password will be selected due to .select('password')
    };

    // Mock the findById method to return a mock user
    (User.findById as jest.Mock).mockResolvedValueOnce(mockUser);

    const user = await UserService.getUserById("1234");

    expect(user).toEqual({
      id: "1234",
      name: "Test User",
      email: "test@example.com",
      password: "hashedPassword", // Ensure the password field is included
    });
    expect(User.findById).toHaveBeenCalledWith("1234");
  });

  it("should return null when the user does not exist", async () => {
    // Mock the findById method to return null (user does not exist)
    (User.findById as jest.Mock).mockResolvedValueOnce(null);

    const user = await UserService.getUserById("nonExistingId");

    expect(user).toBeNull();
    expect(User.findById).toHaveBeenCalledWith("nonExistingId");
  });

  it("should throw an error if there is an issue fetching the user", async () => {
    // Mock the findById method to throw an error (e.g., database connection error)
    (User.findById as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

    try {
      await UserService.getUserById("1234");
    } catch (error) {
      // Check that the correct error message is thrown
      expect((error as Error).message).toBe("Error fetching user from database");
    }

    expect(User.findById).toHaveBeenCalledWith("1234");
  });
});
