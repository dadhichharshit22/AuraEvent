import { Event } from "../models/eventModel";
import mongoose from "mongoose";

/**
 * Custom error classes for better error handling.
 */
class EventNotFoundError extends Error {
  constructor() {
    super("Event not found");
    this.name = "EventNotFoundError";
  }
}

class UserAlreadyRegisteredError extends Error {
  constructor() {
    super("User is already registered");
    this.name = "UserAlreadyRegisteredError";
  }
}

class EventAttendeeService {
  /**
   * Registers a user for an event if they are not already registered.
   * Throws appropriate exceptions instead of returning error objects.
   */
  static async registerAttendee(eventId: string, userId: string) {
    const event = await this.getEventWithAttendeeCheck(eventId, userId);
    if (!event) throw new EventNotFoundError();
    if (event.isAttendee(userId)) throw new UserAlreadyRegisteredError();

    await event.addAttendee(userId);
    return { success: true, message: "Attendee successfully registered" };
  }

  /**
   * Fetches an event and ensures its existence before processing.
   */
  private static async getEventWithAttendeeCheck(eventId: string, userId: string) {
    const event = await Event.findById(eventId);
    return event ? new EventWrapper(event) : null;
  }
}

/**
 * Wrapper for the Event model that encapsulates behavior.
 */
class EventWrapper {
  private event: any;

  constructor(event: any) {
    this.event = event;
  }

  isAttendee(userId: string): boolean {
    return this.event.attendees.some((attendeeId: mongoose.Types.ObjectId) =>
      attendeeId.equals(new mongoose.Types.ObjectId(userId))
    );
  }

  async addAttendee(userId: string) {
    this.event.attendees.push(new mongoose.Types.ObjectId(userId));
    await this.event.save();
  }
}

export default EventAttendeeService;
