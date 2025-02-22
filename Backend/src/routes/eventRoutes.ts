import { Router } from "express";
import { EventController } from "../controllers/eventController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const eventController = new EventController();

// Create event
router.post("/events", authMiddleware, eventController.createEvent);

// Update event
router.put("/events/:id", authMiddleware, eventController.updateEvent);

// Register for an event
router.post(
  "/events/:id/register",
  authMiddleware,
  eventController.registerEvent
);

// Unregister from an event
router.post(
  "/events/:id/unregister",
  authMiddleware,
  eventController.unregisterEvent
);

// Delete event
router.delete("/events/:id", authMiddleware, eventController.deleteEvent);

// Get event by ID
router.get("/events/:id", eventController.getEventById);

// Get all events
router.get("/events", eventController.getAllEvents);

// Get events created by user
router.get("/events/created", authMiddleware, eventController.getCreatedEvents);

// Get events a user is registered for
router.get(
  "/events/registered",
  authMiddleware,
  eventController.getRegisteredEvents
);

export default router;
