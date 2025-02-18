import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthUtils {
  private static readonly SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(userId: string): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
  }
}
