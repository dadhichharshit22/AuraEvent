import { Request, Response } from "express";
import { UserService } from "../services/userService";

interface AuthRequest extends Request {
  user?: { id: string };
}
// get user data
export const getUserProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await UserService.getUserById(req.user?.id ?? "");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
