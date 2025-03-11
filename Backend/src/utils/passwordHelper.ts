import bcrypt from "bcryptjs";
 // handle a Password releated Service
 class PasswordService {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }
   // handle hashPassword
  public async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      throw new Error("Failed to hash password.");
    }
  }
  // handle a comparision Password
  public async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error("Password comparison failed.");
    }
  }
}


export default PasswordService;