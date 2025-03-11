import jwt from "jsonwebtoken";

export class TokenService {
  private readonly jwtSecret: string;

  constructor(secret: string = process.env.JWT_SECRET || "Harshit") {
    this.jwtSecret = secret;
  }

  public generateAuthToken(userId: string): string {
    try {
      return jwt.sign({ userId }, this.jwtSecret, { expiresIn: "24h" });
    } catch (error) {
      throw new Error("Failed to generate authentication token.");
    }
  }
}
