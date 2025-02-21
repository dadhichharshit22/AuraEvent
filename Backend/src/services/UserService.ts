import User, { IUser } from '../models/User';

export class UserService {
  public static async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await User.findById(id);
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user from database');
    }
  }
}