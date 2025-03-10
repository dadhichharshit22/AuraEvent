import { LoginCredentials, RegistrationData, PasswordChangeRequest } from "../types/authTypes";

export class AuthValidator {
  public validateRegistration(userData: RegistrationData): void {
    const requiredFields = ["name", "email", "phoneNumber", "password", "username"];
    const missingFields = requiredFields.filter(field => !userData[field as keyof RegistrationData]);

    if (missingFields.length) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
  }

  public validateLogin(credentials: LoginCredentials): void {
    if (!credentials.email || !credentials.password) {
      throw new Error("Email and password are required.");
    }
  }

  public validatePasswordChange(request: PasswordChangeRequest): void {
    if (!request.email || !request.newPassword || !request.confirmPassword) {
      throw new Error("All fields are required.");
    }
    if (request.newPassword !== request.confirmPassword) {
      throw new Error("Passwords do not match.");
    }
  }
}

