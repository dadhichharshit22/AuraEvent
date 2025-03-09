import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthenticationController {
  constructor(private authService: AuthService) {}

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "An unknown error occurred";
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.authService.register(req.body);
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({ message: this.getErrorMessage(error) });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.authService.login(req.body);
      res.status(200).json({ success: true, token });
    } catch (error) {
      res.status(400).json({ message: this.getErrorMessage(error) });
    }
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    try {
      await this.authService.changePassword(req.body);
      res.status(200).json({ success: true, message: "Password updated" });
    } catch (error) {
      res.status(400).json({ message: this.getErrorMessage(error) });
    }
  }
}
