import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}


export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


