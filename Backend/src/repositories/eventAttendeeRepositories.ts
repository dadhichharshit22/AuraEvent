import { Event } from "../models/eventModal";
import { EventWrapper } from "../services/eventAttendeeService";

// Repository for handling event data persistence.
 
class EventRepository {
  async findById(eventId: string): Promise<EventWrapper | null> {
    const event = await Event.findById(eventId);
    return event ? new EventWrapper(event) : null;
  }

  async save(event: EventWrapper): Promise<void> {
    await event["event"].save(); 
  }
}

export { EventRepository };
