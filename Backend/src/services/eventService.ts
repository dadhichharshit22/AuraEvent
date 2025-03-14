import { Types } from "mongoose";
import EventRepository from "../repositories/eventRepositories";
import { EmailService } from "../services/emailService";
import User from "../models/userModal";

class EventService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async createEvent(eventData: any, user: any) {
    const newEvent = await EventRepository.create({
      ...eventData,
      organizer: new Types.ObjectId(user._id), // Convert user ID to ObjectId
    });

    // Notify organizer
    if (user.email) {
      await this.emailService.notifyEventCreation(
        user.email,
        eventData.title,
        eventData.date.toString(),
        eventData.description
      );
    }

    // Notify all users
    const users = await User.find();
    await Promise.all(
      users.map((user) =>
        this.emailService
          .notifyNewEvent(user.email, eventData.title, eventData.date.toString(), eventData.description)
          .catch((error) => console.error(`Failed to send notification to ${user.email}:`, error))
      )
    );

    return newEvent;
  }

  async updateEvent(eventId: string, updateData: any) {
    const objectId = new Types.ObjectId(eventId); // Ensure ObjectId conversion
    const event = await EventRepository.update(objectId, updateData);
    if (!event) return null;

    // Notify attendees
    const attendeeUsers = await User.find({
      _id: { $in: event.attendees.map((id: Types.ObjectId) => id) }, // Ensure attendees are ObjectIds
    });

    await Promise.all(
      attendeeUsers.map((user) =>
        this.emailService
          .notifyEventUpdate(user.email, updateData.title, updateData.date.toString(), updateData.description)
          .catch((error) => console.error(`Failed to send update notification to ${user.email}:`, error))
      )
    );

    return event;
  }

  async registerForEvent(eventId: string, userId: string) {
    const event = await EventRepository.findById(new Types.ObjectId(eventId));
    if (!event) throw new Error("Event not found");

    // Convert `event.attendees` to strings before comparison
    if (event.attendees.some((attendee: Types.ObjectId) => attendee.equals(userId))) {
      throw new Error("User already registered");
    }

    event.attendees.push(new Types.ObjectId(userId));
    await event.save();

    const user = await User.findById(new Types.ObjectId(userId));
    if (user) {
      await this.emailService.confirmRegistration(user.email, event.title, event.date.toString());
    }

    return { message: "Registered successfully" };
  }

  async unregisterFromEvent(eventId: string, userId: string) {
    const event = await EventRepository.findById(new Types.ObjectId(eventId));
    if (!event) throw new Error("Event not found");

    // Convert `event.attendees` to ObjectId before filtering
    event.attendees = event.attendees.filter(
      (attendee: Types.ObjectId) => !attendee.equals(new Types.ObjectId(userId))
    );

    await event.save();

    const user = await User.findById(new Types.ObjectId(userId));
    if (user) {
      await this.emailService.confirmUnregistration(user.email, event.title, event.date.toString());
    }

    return { message: "Unregistered successfully" };
  }

  async deleteEvent(eventId: string) {
    return EventRepository.delete(new Types.ObjectId(eventId));
  }

  async getEventById(eventId: string) {
    return EventRepository.findById(new Types.ObjectId(eventId));
  }

  async getAllEvents() {
    return EventRepository.findAll();
  }

  async getUserCreatedEvents(userId: string) {
    return EventRepository.findByOrganizer(new Types.ObjectId(userId));
  }

  async getUserRegisteredEvents(userId: string) {
    return EventRepository.findByAttendee(new Types.ObjectId(userId));
  }
}

export default new EventService();
