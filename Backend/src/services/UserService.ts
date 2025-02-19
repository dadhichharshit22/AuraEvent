

import User, { IUser } from '../models/User';

export class UserService {
  public static async getUserById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id).select('password');
    } catch (error) {
      throw new Error('Error fetching user from database');
    }
  }
}