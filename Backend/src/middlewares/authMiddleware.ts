import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModal";

export interface AuthRequest extends Request {
  user?: IUser;
}

const AUTH_HEADER = "Authorization";
const BEARER_PREFIX = "Bearer ";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);
    if (!token) {
      handleAuthError(res, 401, "No token provided");
      return;
    }

    const decoded = verifyToken(token);
    const user = await fetchUser(decoded.userId);

    if (!user) {
      handleAuthError(res, 404, "User not found");
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    handleAuthError(res, 401, "Invalid token");
  }
};


const extractToken = (req: Request): string | null => {
  const header = req.header(AUTH_HEADER);
  return header?.startsWith(BEARER_PREFIX) ? header.replace(BEARER_PREFIX, "") : null;
};


const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};


const fetchUser = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).select("-password"); // Exclude password
};


const handleAuthError = (res: Response, status: number, message: string): void => {
  res.status(status).json({ message });
};
