import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

/**
 * Service function to retrieve user profile from the database
 * @param userId - The ID of the user to fetch
 * @returns A promise resolving to the user profile, excluding sensitive data (password)
 */
const fetchUserProfile = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).select('-password');
};

/**
 * Controller function to handle retrieving user profile data
 * @param req - The request object, containing the authenticated user
 * @param res - The response object, used to send back the user data or an error message
 */
export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user || !req.user.id) {
    res.status(400).json({ message: 'User ID is required for profile retrieval' });
    return;
  }

  try {
    const user = await fetchUserProfile(req.user.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error while retrieving user profile' });
  }
};
