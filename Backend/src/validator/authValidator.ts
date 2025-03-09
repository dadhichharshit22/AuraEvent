// src/validators/authValidator.ts
import { RegistrationData, LoginCredentials, PasswordChangeRequest } from "../types/authTypes";

export class AuthValidator {
  static validateRegistration(userData: RegistrationData): void {
    const { name, email, phoneNumber, password, username } = userData;
    if (!name || !email || !phoneNumber || !password || !username) {
      throw new Error("Missing required registration fields.");
    }
  }

  static validateLogin(credentials: LoginCredentials): void {
    if (!credentials.email || !credentials.password) {
      throw new Error("Email and password are required.");
    }
  }

  static validatePasswordChange(request: PasswordChangeRequest): void {
    if (!request.email || !request.newPassword || !request.confirmPassword) {
      throw new Error("Missing required password change fields.");
    }

    if (request.newPassword !== request.confirmPassword) {
      throw new Error("New password and confirmation do not match.");
    }
  }
}
