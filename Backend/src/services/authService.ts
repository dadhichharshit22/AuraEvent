import { UserRepository } from "../repositories/authRepositories";
import { PasswordHelper } from "../utils/passwordHelper";
import jwt from "jsonwebtoken";
import {LoginCredentials,RegistrationData,PasswordChangeRequest} from "../types/authTypes";



export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(userData: RegistrationData): Promise<string> {
    this.validateRegistrationData(userData);

    const { name, email, phoneNumber, password, username } = userData;

    await this.ensureUserDoesNotExist(email, username);

    const hashedPassword = await PasswordHelper.encryptPassword(password); // ✅ Use static method directly

    const newUser = await this.userRepository.createUser({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      username,
    });

    return this.createAuthToken(newUser.id);
  }

  public async login(credentials: LoginCredentials): Promise<string> {
    this.validateLoginCredentials(credentials);

    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user || !(await PasswordHelper.verifyPassword(credentials.password, user.password))) {
      throw new Error("Invalid email or password.");
    }

    return this.createAuthToken(user.id);
  }

  public async changePassword(request: PasswordChangeRequest): Promise<void> {
    this.validatePasswordChangeRequest(request);

    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new Error("User not found.");
    }

    const hashedPassword = await PasswordHelper.encryptPassword(request.newPassword); 
    await this.userRepository.updatePassword(request.email, hashedPassword);
  }

  private async ensureUserDoesNotExist(email: string, username: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmailOrUsername(email, username);
    if (existingUser) {
      throw new Error(existingUser.email === email ? "Email already registered." : "Username already taken.");
    }
  }

  private validateRegistrationData(userData: RegistrationData): void {
    const { name, email, phoneNumber, password, username } = userData;
    if (!name || !email || !phoneNumber || !password || !username) {
      throw new Error("Missing required registration fields.");
    }
  }

  private validateLoginCredentials(credentials: LoginCredentials): void {
    if (!credentials.email || !credentials.password) {
      throw new Error("Email and password are required.");
    }
  }

  private validatePasswordChangeRequest(request: PasswordChangeRequest): void {
    if (!request.email || !request.newPassword || !request.confirmPassword) {
      throw new Error("Missing required password change fields.");
    }

    if (request.newPassword !== request.confirmPassword) {
      throw new Error("New password and confirmation do not match.");
    }
  }

  private createAuthToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "24h" });
  }
}
