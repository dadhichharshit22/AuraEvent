import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepositories";

jest.mock("../repositories/userRepositories"); // Mock the entire repository module

describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(mockUserRepository);
  });

  it("should return a user when found", async () => {
    const mockUser = { id: "123", name: "John Doe", email: "john@example.com" };
    mockUserRepository.findById = jest.fn().mockResolvedValue(mockUser);

    const result = await userService.getUserById("123");

    expect(result).toEqual(mockUser);
    expect(mockUserRepository.findById).toHaveBeenCalledWith("123");
  });

  it("should return null when user is not found", async () => {
    mockUserRepository.findById = jest.fn().mockResolvedValue(null);

    const result = await userService.getUserById("456");

    expect(result).toBeNull();
    expect(mockUserRepository.findById).toHaveBeenCalledWith("456");
  });

  it("should throw an error if repository fails", async () => {
    mockUserRepository.findById = jest.fn().mockRejectedValue(new Error("Database error"));

    await expect(userService.getUserById("789")).rejects.toThrow("Database error");
    expect(mockUserRepository.findById).toHaveBeenCalledWith("789");
  });
});
