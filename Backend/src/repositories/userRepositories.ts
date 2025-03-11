import User from "../models/userModal";

// Handles a User data interaction with database
export class UserRepository {
 
  async findById(userId: string) {
    const user = await User.findById(userId).lean();
    if (!user) throw new Error("User not found.");
    return user;
  }
}
