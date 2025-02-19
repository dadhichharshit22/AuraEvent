import request from 'supertest';
import express from 'express';
import { getUserProfile } from '../controllers/userController';
import { UserService } from '../services/UserService';

// Mock UserService
jest.mock('../services/UserService');

const app = express();
app.use(express.json());
app.get('/userProfile', getUserProfile);

describe('UserController - getUserProfile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with user data when user is found', async () => {
    const mockUser = { id: '123', name: 'John Doe', email: 'john@example.com' };
    
    // Mock the UserService method to return a mock user
    (UserService.getUserById as jest.Mock).mockResolvedValue(mockUser);

    // Mock request with user ID
    const response = await request(app)
      .get('/userProfile')
      .set('Authorization', 'Bearer some-token')
      .send({ user: { id: '123' } });  // Simulating the auth middleware setting the user

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should return 404 if user is not found', async () => {
    // Mock the UserService method to return null (user not found)
    (UserService.getUserById as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .get('/userProfile')
      .set('Authorization', 'Bearer some-token')
      .send({ user: { id: '123' } });  // Simulating the auth middleware setting the user

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'User not found' });
  });

  it('should return 500 if an error occurs in the service layer', async () => {
    // Mock the UserService method to throw an error
    (UserService.getUserById as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .get('/userProfile')
      .set('Authorization', 'Bearer some-token')
      .send({ user: { id: '123' } });  // Simulating the auth middleware setting the user

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Server error' });
  });
});
