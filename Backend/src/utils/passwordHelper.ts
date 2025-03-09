import bcrypt from "bcryptjs";

export class PasswordHelper {
  private static readonly SALT_ROUNDS = 10;

  static encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
