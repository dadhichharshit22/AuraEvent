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
    await this.registrationService.register(req, res);
  }

  public async login(req: Request, res: Response): Promise<void> {
    await this.loginService.login(req, res);
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    await this.passwordChangeService.changePassword(req, res);
  }
}
