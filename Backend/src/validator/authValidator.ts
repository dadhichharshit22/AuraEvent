import { LoginCredentials, RegistrationData, PasswordChangeRequest } from "../types/authTypes";

export class AuthValidator {
  
  public static validateRegistration(userData: RegistrationData): void {
    this.ensureRequiredFieldsPresent(userData, ["name", "email", "phoneNumber", "password", "username"]);
  }

  public static validateLogin(credentials: LoginCredentials): void {
    this.ensureRequiredFieldsPresent(credentials, ["email", "password"]);
  }

  public static validatePasswordChange(request: PasswordChangeRequest): void {
    this.ensureRequiredFieldsPresent(request, ["email", "newPassword", "confirmPassword"]);
    this.ensurePasswordsMatch(request.newPassword, request.confirmPassword);
  }

  private static ensureRequiredFieldsPresent(data: Record<string, any>, requiredFields: string[]): void {
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
  }

  private static ensurePasswordsMatch(newPassword: string, confirmPassword: string): void {
    if (newPassword !== confirmPassword) {
      throw new Error("Password confirmation does not match the new password.");
    }
  }
}
