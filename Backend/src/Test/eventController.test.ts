import request from 'supertest';
import app from '../app';  // Import your Express app
import { Event } from '../models/Event';
import User from '../models/User';
import mongoose from 'mongoose';

// A mock user to simulate authentication
let mockUserId: string;
let mockEventId: string;

// Mock data for events
const eventData = {
  title: 'Test Event',
  description: 'A description of the test event',
  date: new Date(),
  location: 'Test Location',
  category: 'Test Category',
  image: 'test.jpg',
  price: 10,
  type: 'Online',
  capacity: 100
};

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect('mongodb://localhost:8085/Event');

  // Create a mock user for testing
  const user = await User.create({
    email: 'testuser@example.com',
    password: 'password123',
    name: 'Test User'
  });

  mockUserId = user._id.toString();  // Store the userId for later use
});

afterAll(async () => {
  // Clean up and close the database connection
  await mongoose.connection.close();
});

describe('Event Controller', () => {
  // Test event creation
  it('should create an event', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${mockUserId}`) // Simulate authentication
      .send(eventData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', eventData.title);
    expect(res.body).toHaveProperty('organizer', mockUserId);

    mockEventId = res.body._id;  // Save the event ID for further tests
  });

  // Test get event by ID
  it('should get an event by ID', async () => {
    const res = await request(app)
      .get(`/api/events/${mockEventId}`)
      .set('Authorization', `Bearer ${mockUserId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', mockEventId);
    expect(res.body).toHaveProperty('title', eventData.title);
  });

  // Test update event
  it('should update an event', async () => {
    const updatedData = {
      title: 'Updated Test Event',
      description: 'Updated description',
      date: new Date(),
      location: 'Updated Location',
      category: 'Updated Category',
      image: 'updated.jpg',
      price: 20,
      type: 'Offline',
      capacity: 200
    };

    const res = await request(app)
      .put(`/api/events/${mockEventId}`)
      .set('Authorization', `Bearer ${mockUserId}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', updatedData.title);
    expect(res.body).toHaveProperty('description', updatedData.description);
  });

  // Test event registration
  it('should register a user for an event', async () => {
    const res = await request(app)
      .post(`/api/events/${mockEventId}/register`)
      .set('Authorization', `Bearer ${mockUserId}`)
      .send({ userId: mockUserId });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Registered successfully');
  });

  // Test event unregistration
  it('should unregister a user from an event', async () => {
    const res = await request(app)
      .post(`/api/events/${mockEventId}/unregister`)
      .set('Authorization', `Bearer ${mockUserId}`)
      .send({ userId: mockUserId });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Unregistered successfully');
  });

  // Test delete event
  it('should delete an event', async () => {
    const res = await request(app)
      .delete(`/api/events/${mockEventId}`)
      .set('Authorization', `Bearer ${mockUserId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Event deleted successfully');
  });
});
