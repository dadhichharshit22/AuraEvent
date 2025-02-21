import { Request, Response } from "express";
import User from "../models/User";
import { EmailService } from "../services/emailService";
import { PasswordHelper } from "../utils/passwordHelper";
import jwt from "jsonwebtoken";

export interface IAuthenticationService {
    changePassword(req: Request, res: Response): Promise<void>;
  }
  


export class PasswordChangeService implements IAuthenticationService {
    async changePassword(req: Request, res: Response): Promise<void> {
      const { password, confirmPassword, email } = req.body;
  
      const missingFieldsError = this.validateRequiredFields({ password, confirmPassword, email });
      if (missingFieldsError) {
        this.handleErrorResponse(res, 400, missingFieldsError);
        return;
      }
  
      if (password !== confirmPassword) {
        this.handleErrorResponse(res, 400, "Passwords don't match.");
        return;
      }
  
      try {
        const user = await User.findOne({ email });
        if (!user) {
          this.handleErrorResponse(res, 404, "User not found.");
          return;
        }
  
        const hashedPassword = await PasswordHelper.hashPassword(password);
        await User.updateOne({ email }, { password: hashedPassword });
  
        res.status(200).json({ success: true, message: "Password reset successfully." });
      } catch (error) {
        this.handleErrorResponse(res, 500, "Server error during password reset.");
      }
    }
  
    private validateRequiredFields(fields: Record<string, any>): string | null {
      const missingFields = Object.entries(fields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
      return missingFields.length > 0
        ? `Missing required fields: ${missingFields.join(", ")}`
        : null;
    }
  
    private handleErrorResponse(res: Response, status: number, message: string): void {
      res.status(status).json({ success: false, message });
    }
  }