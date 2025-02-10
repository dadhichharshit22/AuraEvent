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

export class authentication {
  private readonly SALT_ROUNDS = 10;

  constructor(private emailService: EmailService) {}

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  }

  private handleErrorResponse(res: Response, status: number, message: string): void {
    res.status(status).json({ success: false, message });
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phoneNumber, password, username } = req.body;

    if (!name || !email || !password || !phoneNumber || !username) {
      this.handleErrorResponse(res, 400, "Please provide all required fields.");
      return;
    }

    try {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });

      if (existingUser) {
        const errorMessage =
          existingUser.email === email ? "Email already registered." : "Username already taken.";
        this.handleErrorResponse(res, 400, errorMessage);
        return;
      }

      const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
      const profilePicture = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

      const user = await User.create({ name, email, phoneNumber, password: hashedPassword, profilePicture, username });

      const token = this.generateToken(user.id);
      await this.emailService.sendWelcomeEmail(name, email);

      res.json({ success: true, token });
    } catch (error) {
      console.error("Registration error:", error);
      this.handleErrorResponse(res, 500, "Server error.");
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        this.handleErrorResponse(res, 400, "Invalid credentials.");
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.handleErrorResponse(res, 400, "Invalid credentials.");
        return;
      }

      const token = this.generateToken(user.id);
      res.json({ success: true, token });
    } catch (error) {
      console.error("Login error:", error);
      this.handleErrorResponse(res, 500, "Server error.");
    }
  };

  public changePassword = async (req: Request, res: Response): Promise<void> => {
    const { password, confirmPassword, email }: PasswordChangeRequest = req.body;

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

      const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
      await User.updateOne({ email }, { password: hashedPassword });

      res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error) {
      console.error("Password change error:", error);
      this.handleErrorResponse(res, 500, "Something went wrong while resetting the password.");
    }
  };
}
