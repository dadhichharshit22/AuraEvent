import User from "../models/userModal";

export class UserRepository {
  async findById(userId: string) {
    return await User.findById(userId);
  }
}
