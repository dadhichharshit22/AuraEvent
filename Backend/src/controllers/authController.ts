import { Request, Response } from "express";
import { AuthService } from "../services/authService";

// Handle Authentication 
export class AuthenticationController {
  constructor(private authService: AuthService) {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.authService.register(req.body);

      res.status(201).json({ 
        success: true, 
        token 
      });

    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: this.getErrorMessage(error) 
      });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.authService.login(req.body);

      res.status(200).json({ 
        success: true, 
        token 
      });

    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: this.getErrorMessage(error) 
      });
    }
  }

  public async changePassword(req: Request, res: Response): Promise<void> {
    try {
      await this.authService.changePassword(req.body);

      res.status(200).json({ 
        success: true, 
        message: "Password updated successfully" 
      });

    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: this.getErrorMessage(error) 
      });
    }
    
  }

  
  public async setCookieConsent(req: Request, res: Response): Promise<void> {
    try {
      res.cookie("userConsent", "accepted", {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.json({ success: true, message: "Cookie consent saved" });

    } catch (error) {
      res.status(500).json({ success: false, message: this.getErrorMessage(error) });
    }
  }
  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "An unknown error occurred";
  }
}
