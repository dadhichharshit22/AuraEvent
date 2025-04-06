import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware to authenticate user using cookie
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Middleware to check cookie consent
export const checkCookieConsent = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.userConsent === "accepted") {
    console.log("User accepted cookies. Enable tracking.");
  } else {
    console.log("User declined cookies. Disable tracking.");
  }
  next();
};
