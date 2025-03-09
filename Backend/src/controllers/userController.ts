import { Request, Response } from "express";
import { UserService } from "../services/userService";

interface AuthRequest extends Request {
  user?: { id: string };
}

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUserProfile(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    try {
      const user = await this.userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
