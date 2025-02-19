import { UserService } from "../services/userService";
import User from "../models/user";

jest.mock("../models/User");

describe("UserService", () => {
  it("should return a user when the user exists", async () => {
    const mockUser = {
      id: "1234",
      name: "Test User",
      email: "test@example.com",
      password: "hashedPassword",
    };

    (User.findById as jest.Mock).mockResolvedValueOnce(mockUser);

    const user = await UserService.getUserById("1234");

    expect(user).toEqual({
      id: "1234",
      name: "Test User",
      email: "test@example.com",
      password: "hashedPassword",
    });
    expect(User.findById).toHaveBeenCalledWith("1234");
  });

  it("should return null when the user does not exist", async () => {
    (User.findById as jest.Mock).mockResolvedValueOnce(null);

    const user = await UserService.getUserById("nonExistingId");

    expect(user).toBeNull();
    expect(User.findById).toHaveBeenCalledWith("nonExistingId");
  });

  it("should throw an error if there is an issue fetching the user", async () => {
    (User.findById as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    try {
      await UserService.getUserById("1234");
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error fetching user from database"
      );
    }

    expect(User.findById).toHaveBeenCalledWith("1234");
  });
});
