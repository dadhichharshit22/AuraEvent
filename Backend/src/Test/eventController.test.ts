import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import User from "../models/User";

let mockUserId: string;
let mockEventId: string;

const eventData = {
  title: "Test Event",
  description: "A test event description",
  date: new Date(),
  location: "Test Location",
  category: "Test Category",
  image: "test.jpg",
  price: 10,
  type: "Online",
  capacity: 100,
};

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/EventTestDB");

  const user = await User.create({
    email: "testuser@example.com",
    password: "password123",
    name: "Test User",
  });

  mockUserId = user._id.toString();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Event Controller", () => {
  it("should create a new event", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${mockUserId}`)
      .send(eventData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe(eventData.title);

    mockEventId = res.body._id;
  });

  it("should retrieve an event by ID", async () => {
    const res = await request(app)
      .get(`/api/events/${mockEventId}`)
      .set("Authorization", `Bearer ${mockUserId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(mockEventId);
    expect(res.body.title).toBe(eventData.title);
  });

  it("should update an event", async () => {
    const updatedData = {
      title: "Updated Event Title",
      description: "Updated description",
      date: new Date(),
      location: "Updated Location",
      category: "Updated Category",
      image: "updated.jpg",
      price: 20,
      type: "Offline",
      capacity: 200,
    };

    const res = await request(app)
      .put(`/api/events/${mockEventId}`)
      .set("Authorization", `Bearer ${mockUserId}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedData.title);
    expect(res.body.description).toBe(updatedData.description);
  });

  it("should register a user for the event", async () => {
    const res = await request(app)
      .post(`/api/events/${mockEventId}/register`)
      .set("Authorization", `Bearer ${mockUserId}`)
      .send({ userId: mockUserId });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Registered successfully");
  });

  it("should unregister a user from the event", async () => {
    const res = await request(app)
      .post(`/api/events/${mockEventId}/unregister`)
      .set("Authorization", `Bearer ${mockUserId}`)
      .send({ userId: mockUserId });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Unregistered successfully");
  });

  it("should delete an event", async () => {
    const res = await request(app)
      .delete(`/api/events/${mockEventId}`)
      .set("Authorization", `Bearer ${mockUserId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Event deleted successfully");
  });
});
