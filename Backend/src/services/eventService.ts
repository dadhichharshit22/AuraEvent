import { Types } from "mongoose";
import EventRepository from "../repositories/eventRepositories";
import { EmailService } from "../services/emailService";
import User from "../models/userModal";
import { saveQrCodeUrl, deleteQrCodeUrl } from "../repositories/qrCodeRepositories";
import QRCode from "qrcode";

class EventService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async createEvent(eventData: any, user: any,req:any) {
    const imageUrl = req.file ? req.file.path : null;
    const newEvent = await EventRepository.create({
      ...eventData,
      imageUrl,
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

    if (event.attendees.some((attendee: Types.ObjectId) => attendee.equals(userId))) {
      throw new Error("User already registered");
    }

    event.attendees.push(new Types.ObjectId(userId));
    await event.save();

    const user = await User.findById(new Types.ObjectId(userId));
    if (user) {
      await this.emailService.confirmRegistration(user.email, event.title, event.date.toString());
    }

    
    const qrCodeUrl = await this.generateQrCode(eventId, userId, event.title, event.date);
    
    
    await saveQrCodeUrl(eventId, userId, qrCodeUrl);

    return { message: "Registered successfully", qrCodeUrl };
  }

  async unregisterFromEvent(eventId: string, userId: string) {
    const event = await EventRepository.findById(new Types.ObjectId(eventId));
    if (!event) throw new Error("Event not found");

    event.attendees = event.attendees.filter(
      (attendee: Types.ObjectId) => !attendee.equals(new Types.ObjectId(userId))
    );
    await event.save();

    const user = await User.findById(new Types.ObjectId(userId));
    if (user) {
      await this.emailService.confirmUnregistration(user.email, event.title, event.date.toString());
    }

    // ✅ Delete QR Code from Database
    await deleteQrCodeUrl(eventId, userId);

    return { message: "Unregistered successfully" };
  }

  /**
   * Generates a QR Code with event details.
   * @param eventId - The event ID
   * @param userId - The user ID
   * @param title - The event title
   * @param date - The event date
   * @returns {Promise<string>} - The QR code URL
   */
  private async generateQrCode(eventId: string, userId: string, title: string, date: Date): Promise<string> {
    const qrData = JSON.stringify({ eventId, userId, title, date });

    // Generate QR code as a Data URL
    const qrCode = await QRCode.toDataURL(qrData);

    return qrCode; // You can upload this to cloud storage and return the URL
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
