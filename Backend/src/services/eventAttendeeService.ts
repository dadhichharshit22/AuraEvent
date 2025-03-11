import mongoose from "mongoose";
import { EventAttendeeRepository } from "../repositories/eventAttendeeRepositories";




 // Service for managing event attendees.
 
class EventAttendeeService {
  private eventRepository: EventAttendeeRepository;

  constructor(eventRepository: EventAttendeeRepository) {
    this.eventRepository = eventRepository;
  }

  
   // Registers a user for an event if they are not already registered.
   
  
  async registerAttendee(eventId: string, userId: string): Promise<void> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) throw new EventNotFoundError();

    const wrappedEvent = new EventWrapper(event);

    if (wrappedEvent.hasAttendee(userId)) throw new UserAlreadyRegisteredError();

    wrappedEvent.addAttendee(userId);
    await this.eventRepository.save(event);
  }
}


 // encapsulate behavior of attendee.
 
class EventWrapper {
  private event: any;

  constructor(event: any) {
    this.event = event;
  }

  
  public getEvent(): Event {
    return this.event;
  }

  
   // Checks if a user is already registered for the event.
   
  hasAttendee(userId: string): boolean {
    if (!this.event || !this.event.attendees) {
      return false; // Prevents reading 'some' on undefined
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);
    return this.event.attendees.some((attendeeId: mongoose.Types.ObjectId) =>
      attendeeId.equals(userObjectId)
    );
  }

  
   // Adds an attendee to the event.
   
  addAttendee(userId: string) {
    this.event.attendees.push(new mongoose.Types.ObjectId(userId));
  }
}


 
 
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

export { EventAttendeeService, EventNotFoundError, UserAlreadyRegisteredError, EventWrapper };
