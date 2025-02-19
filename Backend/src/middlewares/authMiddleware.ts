import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User,{IUser} from "../models/user";

export interface AuthRequest extends Request {
  user?: IUser;
}


const extractToken = (req: Request): string | null => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  return token || null;
};


const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    throw new Error("Invalid token");
  }
};


const fetchUserById = async (userId: string) => {
  return await User.findById(userId).select("password");
};

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = extractToken(req);

  if (!token) {
    res.status(401).send({ message: "No token provided" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    const user = await fetchUserById(decoded.userId);

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).send({ message: error.message || "Authentication failed" });
  }
};
