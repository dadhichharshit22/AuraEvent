import jwt from "jsonwebtoken";

// Service for the token
export class TokenService {
  private readonly jwtSecret: string;

  constructor(secret: string = process.env.JWT_SECRET || "Harshit") {
    this.jwtSecret = secret;
  }
 // handle a generation of authToken
  public generateAuthToken(userId: string): string {
    try {
      return jwt.sign({ userId }, this.jwtSecret, { expiresIn: "24h" });
    } catch (error) {
      throw new Error("Failed to generate authentication token.");
    }
  }
}
