import { UserRepository } from "../repositories/userRepositories";
import User from "../../src/models/userModal";

jest.mock("../../src/models/userModal"); // Mock Mongoose model

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    jest.clearAllMocks(); // Reset mocks before each test
  });

  describe("findById", () => {
    it("should return a user if found", async () => {
      const mockUser = { _id: "123", name: "John Doe", email: "john@example.com" };
      (User.findById as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(mockUser) });

      const result = await userRepository.findById("123");

      expect(User.findById).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if user is not found", async () => {
      (User.findById as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

      await expect(userRepository.findById("unknown_user_id")).rejects.toThrow("User not found.");
    });
  });
});
