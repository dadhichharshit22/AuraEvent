import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { EmailService } from "../services/emailService";

interface PasswordChangeRequest {
  password: string;
  confirmPassword: string;
  email: string;
}

export class AuthenticationService {
  private readonly SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

  constructor(private emailService: EmailService) {}

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });
  }

  private handleErrorResponse(res: Response, status: number, message: string): void {
    res.status(status).json({ success: false, message });
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, phoneNumber, password, username } = req.body;
      
      if (![name, email, password, phoneNumber, username].every(Boolean)) {
        return this.handleErrorResponse(res, 400, "All fields are required.");
      }

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return this.handleErrorResponse(
          res,
          400,
          existingUser.email === email ? "Email already registered." : "Username already taken."
        );
      }

      const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
      const profilePicture = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

      const user = new User({ name, email, phoneNumber, password: hashedPassword, profilePicture, username });
      await user.save();

      const token = this.generateToken(user.id);
      await this.emailService.sendWelcomeEmail(name, email);

      res.json({ success: true, token });
    } catch (error) {
      console.error("Registration error:", error);
      this.handleErrorResponse(res, 500, "Server error.");
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return this.handleErrorResponse(res, 400, "Invalid credentials.");
      }

      const token = this.generateToken(user.id);
      res.json({ success: true, token });
    } catch (error) {
      console.error("Login error:", error);
      this.handleErrorResponse(res, 500, "Server error.");
    }
  };

  public changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { password, confirmPassword, email }: PasswordChangeRequest = req.body;

      if (password !== confirmPassword) {
        return this.handleErrorResponse(res, 400, "Passwords don't match.");
      }

      const user = await User.findOne({ email });
      if (!user) {
        return this.handleErrorResponse(res, 404, "User not found.");
      }

      user.password = await bcrypt.hash(password, this.SALT_ROUNDS);
      await user.save();

      res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error) {
      console.error("Password change error:", error);
      this.handleErrorResponse(res, 500, "Error resetting password.");
    }
  };
}
