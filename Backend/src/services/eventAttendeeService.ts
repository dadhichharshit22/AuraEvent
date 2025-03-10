import mongoose from "mongoose";
import { EventRepository } from "../repositories/eventAttendeeRepositories";

/**
 * Custom error class for when an event is not found.
 */
class EventNotFoundError extends Error {
  constructor() {
    super("Event not found");
    this.name = "EventNotFoundError";
  }
}

/**
 * Custom error class for when a user is already registered.
 */
class UserAlreadyRegisteredError extends Error {
  constructor() {
    super("User is already registered");
    this.name = "UserAlreadyRegisteredError";
  }
}

/**
 * Service for managing event attendees.
 */
class EventAttendeeService {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  /**
   * Registers a user for an event if they are not already registered.
   * Throws exceptions instead of returning error objects.
   */
  async registerAttendee(eventId: string, userId: string): Promise<void> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) throw new EventNotFoundError();

    const wrappedEvent = new EventWrapper(event);

    if (wrappedEvent.hasAttendee(userId)) throw new UserAlreadyRegisteredError();

    wrappedEvent.addAttendee(userId);
    await this.eventRepository.save(event);
  }
}

/**
 * Wrapper class for an Event document to encapsulate behavior.
 */
class EventWrapper {
  private event: any;

  constructor(event: any) {
    this.event = event;
  }

  /**
   * Checks if a user is already registered for the event.
   */
  hasAttendee(userId: string): boolean {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    return this.event.attendees.some((attendeeId: mongoose.Types.ObjectId) =>
      attendeeId.equals(userObjectId)
    );
  }

  /**
   * Adds an attendee to the event.
   */
  addAttendee(userId: string) {
    this.event.attendees.push(new mongoose.Types.ObjectId(userId));
  }
}

export { EventAttendeeService, EventNotFoundError, UserAlreadyRegisteredError, EventWrapper };
