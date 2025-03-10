import User from "../models/userModal";

export class UserRepository {
  /**
   * Finds a user by ID.
   * Throws an error if the user is not found.
   */
  async findById(userId: string) {
    const user = await User.findById(userId).lean();
    if (!user) throw new Error("User not found.");
    return user;
  }
}
