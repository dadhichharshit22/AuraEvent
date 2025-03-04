import { Request, Response } from "express";
import { RegistrationService } from "../services/registrationService";
import { LoginService } from "../services/loginService";
import { PasswordChangeService } from "../services/passwordChangeService";

export class AuthenticationController {
  constructor(
    private registrationService: RegistrationService,
    private loginService: LoginService,
    private passwordChangeService: PasswordChangeService
  ) {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      await this.registrationService.register(req, res);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: "Registration failed", error: errMsg });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      await this.loginService.login(req, res);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: "Login failed", error: errMsg });
    }
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    try {
      await this.passwordChangeService.changePassword(req, res);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: "Password change failed", error: errMsg });
    }
  }
}
