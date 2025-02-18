import Event from "../models/Event";
import User from "../models/User";
import { IUser } from "../models/User";

class EventService {
  public async createEvent(eventData: any, organizerId: string | undefined) {
    const { title, description, date, location, category, image, price = 0, type, capacity } = eventData;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category,
      organizer: organizerId,
      image,
      price,
      type,
      capacity,
      attendees: [],
    });

    return await newEvent.save();
  }

  public async updateEvent(id: string, eventData: any) {
    const { title, description, date, location, image, price, type, capacity } = eventData;

    const event = await Event.findByIdAndUpdate(id, {
      title,
      description,
      date,
      location,
      image,
      price,
      type,
      capacity,
    }, { new: true, runValidators: true });

    return event;
  }

  public async registerUserToEvent(eventId: string, userId: string) {
    const event = await Event.findById(eventId);

    if (!event) return { success: false, message: "Event not found" };

    if (event.attendees.includes(userId)) {
      return { success: false, message: "User already registered" };
    }

    event.attendees.push(userId);
    await event.save();

    const user = await User.findById(userId);
    if (user) {
      return {
        success: true,
        userEmail: user.email,
        eventTitle: event.title,
        eventDate: event.date.toString(),
      };
    }

    return { success: false, message: "User not found" };
  }

  public async unregisterUserFromEvent(eventId: string, userId: string) {
    const event = await Event.findById(eventId);

    if (!event) return { success: false, message: "Event not found" };

    const userIndex = event.attendees.indexOf(userId);
    if (userIndex === -1) {
      return { success: false, message: "User not registered" };
    }

    event.attendees.splice(userIndex, 1);
    await event.save();

    const user = await User.findById(userId);
    if (user) {
      return {
        success: true,
        userEmail: user.email,
        eventTitle: event.title,
        eventDate: event.date.toString(),
      };
    }

    return { success: false, message: "User not found" };
  }
}

export default EventService;
