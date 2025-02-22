import { Request, Response } from "express";
import User from "../models/userModal";
import { PasswordHelper } from "../utils/passwordHelper";
import jwt from "jsonwebtoken";

export interface IAuthenticationService {
  login(req: Request, res: Response): Promise<void>;
}

export class LoginService implements IAuthenticationService {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const missingFieldsError = this.validateRequiredFields({ email, password });
    if (missingFieldsError) {
      this.handleErrorResponse(res, 400, missingFieldsError);
      return;
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        this.handleErrorResponse(res, 400, "Invalid credentials.");
        return;
      }

      const isPasswordValid = await PasswordHelper.comparePasswords(
        password,
        user.password
      );
      if (!isPasswordValid) {
        this.handleErrorResponse(res, 400, "Invalid credentials.");
        return;
      }

      const token = this.generateToken(user.id);
      res.status(200).json({ success: true, token });
    } catch (error) {
      this.handleErrorResponse(res, 500, "Server error during login.");
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

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });
  }

  private handleErrorResponse(
    res: Response,
    status: number,
    message: string
  ): void {
    res.status(status).json({ success: false, message });
  }
}
