import { AuthRepository } from "../repositories/authRepositories";
import User from "../../src/models/userModal";

jest.mock("../../src/models/userModal"); // Mock the Mongoose model

describe("AuthRepository", () => {
  let authRepository: AuthRepository;

  beforeEach(() => {
    authRepository = new AuthRepository();
    jest.clearAllMocks(); // Reset mocks before each test
  });

  describe("findByEmail", () => {
    it("should return a user if email exists", async () => {
      const mockUser = { email: "test@example.com", username: "testuser" };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await authRepository.findByEmail("test@example.com");

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(result).toEqual(mockUser);
    });

    it("should return null if email does not exist", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await authRepository.findByEmail("unknown@example.com");

      expect(User.findOne).toHaveBeenCalledWith({ email: "unknown@example.com" });
      expect(result).toBeNull();
    });
  });

  describe("findByEmailOrUsername", () => {
    it("should return a user if email or username matches", async () => {
      const mockUser = { email: "test@example.com", username: "testuser" };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await authRepository.findByEmailOrUsername("test@example.com", "testuser");

      expect(User.findOne).toHaveBeenCalledWith({
        $or: [{ email: "test@example.com" }, { username: "testuser" }],
      });
      expect(result).toEqual(mockUser);
    });

    it("should return null if no match is found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await authRepository.findByEmailOrUsername("unknown@example.com", "unknownuser");

      expect(User.findOne).toHaveBeenCalledWith({
        $or: [{ email: "unknown@example.com" }, { username: "unknownuser" }],
      });
      expect(result).toBeNull();
    });
  });

  describe("createUser", () => {
    it("should create and return a new user", async () => {
      const mockUserData = { email: "new@example.com", username: "newuser", password: "hashedpassword" };
      (User.create as jest.Mock).mockResolvedValue(mockUserData);

      const result = await authRepository.createUser(mockUserData);

      expect(User.create).toHaveBeenCalledWith(mockUserData);
      expect(result).toEqual(mockUserData);
    });
  });

  describe("updatePassword", () => {
    it("should update the password for a given email", async () => {
      (User.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });

      const result = await authRepository.updatePassword("test@example.com", "newhashedpassword");

      expect(User.updateOne).toHaveBeenCalledWith(
        { email: "test@example.com" },
        { password: "newhashedpassword" }
      );
      expect(result).toEqual({ modifiedCount: 1 });
    });

    it("should return an error if update fails", async () => {
      (User.updateOne as jest.Mock).mockRejectedValue(new Error("Update failed"));

      await expect(authRepository.updatePassword("test@example.com", "newhashedpassword")).rejects.toThrow(
        "Update failed"
      );
    });
  });
});
