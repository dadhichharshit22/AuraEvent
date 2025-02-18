import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User,{IUser} from "../models/User";

export interface AuthRequest extends Request {
  user?: IUser;
}

/**
 * Function to extract the JWT token from the Authorization header
 * @param req - The request object
 * @returns The extracted token or null if not found
 */
const extractToken = (req: Request): string | null => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  return token || null;
};

/**
 * Function to verify the token and decode it
 * @param token - The JWT token
 * @returns The decoded token or throws an error if invalid
 */
const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    throw new Error("Invalid token");
  }
};

/**
 * Function to fetch the user from the database using the decoded token
 * @param userId - The ID of the user to fetch
 * @returns The user document or null if not found
 */
const fetchUserById = async (userId: string) => {
  return await User.findById(userId).select("password");
};

/**
 * Middleware to authenticate the user based on the JWT token
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function
 */
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
