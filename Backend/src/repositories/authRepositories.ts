import User from "../models/userModal";

export class UserRepository {
  public async findByEmail(email: string) {
    return User.findOne({ email });
  }

  public async findByEmailOrUsername(email: string, username: string) {
    return User.findOne({ $or: [{ email }, { username }] });
  }

  public async createUser(userData: any) {
    return User.create(userData);
  }

  public async updatePassword(email: string, hashedPassword: string) {
    return User.updateOne({ email }, { password: hashedPassword });
  }
}
