import jwt from "jsonwebtoken";

export class TokenService {
  private secret = process.env.JWT_SECRET || "default_secret";

  public createToken(userId: string): string {
    return jwt.sign({ userId }, this.secret, { expiresIn: "24h" });
  }
}
