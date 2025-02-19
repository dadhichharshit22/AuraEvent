import { Request, Response } from "express";
import User from "../models/User";
import { EmailService } from "../services/emailService";
import { PasswordHelper } from "../utils/passwordHelper";
import jwt from "jsonwebtoken";

export interface IAuthenticationService {
    register(req: Request, res: Response): Promise<void>;
    
  }
  

export class RegistrationService implements IAuthenticationService {
  constructor(private emailService: EmailService) {}

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });
  }

  async register(req: Request, res: Response): Promise<void> {
    const { name, email, phoneNumber, password, username } = req.body;
    const missingFieldsError = this.validateRequiredFields({ name, email, phoneNumber, password, username });
    if (missingFieldsError) {
      this.handleErrorResponse(res, 400, missingFieldsError);
      return;
    }

    try {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        const errorMessage = existingUser.email === email ? "Email already registered." : "Username already taken.";
        this.handleErrorResponse(res, 400, errorMessage);
        return;
      }

      const hashedPassword = await PasswordHelper.hashPassword(password);
      const profilePicture = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

      const user = await User.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        profilePicture,
        username,
      });

      const token = this.generateToken(user.id);
      await this.emailService.sendWelcomeEmail(name, email);

      res.status(201).json({ success: true, token });
    } catch (error) {
      this.handleErrorResponse(res, 500, "Server error during registration.");
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
