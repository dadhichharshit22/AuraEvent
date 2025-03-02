import { Event } from "../models/eventModal";
import User from "../models/userModal";
import { EmailService } from "../services/emailService";
import { NotFoundError, ValidationError } from "../utils/errors";

export class EventService {
  constructor(private emailService: EmailService) {}

  public async createEvent(data: any, userId: string) {
    const newEvent = new Event({ ...data, organizer: userId, attendees: [] });
    const savedEvent = await newEvent.save();

    // Notify organizer
    await this.emailService.sendEventCreationEmail(
      data.email,
      data.title,
      data.date.toString(),
      data.description
    );

    // Notify all users
    const users = await User.find();
    await Promise.all(
      users.map(user =>
        this.emailService.sendNewEventNotification(
          user.email,
          data.title,
          data.date.toString(),
          data.description
        )
      )
    );

    return savedEvent;
  }

  public async updateEvent(eventId: string, updates: any) {
    const event = await Event.findByIdAndUpdate(eventId, updates, { new: true, runValidators: true });
    if (!event) throw new NotFoundError("Event not found");

    // Notify attendees
    const attendeeUsers = await User.find({ _id: { $in: event.attendees } });
    await Promise.all(
      attendeeUsers.map(user =>
        this.emailService.sendEventUpdateEmail(user.email, updates.title, updates.date.toString(), updates.description)
      )
    );

    return event;
  }

  public async registerEvent(eventId: string, userId: string) {
    const event = await Event.findById(eventId);
    if (!event) throw new NotFoundError("Event not found");

    if (event.attendees.includes(userId)) {
      throw new ValidationError("User already registered for this event");
    }

    event.attendees.push(userId);
    await event.save();

    const user = await User.findById(userId);
    if (user) {
      await this.emailService.sendEventRegistrationEmail(user.email, event.title, event.date.toString());
    }

    return { message: "Registered successfully" };
  }

  public async unregisterEvent(eventId: string, userId: string) {
    const event = await Event.findById(eventId);
    if (!event) throw new NotFoundError("Event not found");

    if (!event.attendees.includes(userId)) {
      throw new ValidationError("User not registered for this event");
    }

    event.attendees = event.attendees.filter(attendee => attendee.toString() !== userId);
    await event.save();

    const user = await User.findById(userId);
    if (user) {
      await this.emailService.sendEventUnregistrationEmail(user.email, event.title, event.date.toString());
    }

    return { message: "Unregistered successfully" };
  }

  public async deleteEvent(eventId: string) {
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) throw new NotFoundError("Event not found");
    return { message: "Event deleted successfully" };
  }

  public async getEventById(eventId: string) {
    const event = await Event.findById(eventId);
    if (!event) throw new NotFoundError("Event not found");
    return event;
  }

  public async getAllEvents() {
    return await Event.find();
  }

  public async getCreatedEvents(userId: string) {
    return await Event.find({ organizer: userId });
  }

  public async getRegisteredEvents(userId: string) {
    return await Event.find({ attendees: userId });
  }
}
