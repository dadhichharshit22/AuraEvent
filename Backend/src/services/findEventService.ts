import { Event } from "../models/Event";  
import mongoose from "mongoose";

class EventService {
  static async getEventById(eventId: string) {
    return await Event.findById(eventId);
  }

  static isUserRegistered(event: any, userId: string): boolean {
    return event?.attendees?.includes(new mongoose.Types.ObjectId(userId));
  }

  static async addAttendee(eventId: string, userId: string) {
    try {
      const event = await Event.findByIdAndUpdate(
        eventId,
        { $push: { attendees: userId } },
        { new: true }
      );

      if (!event) {
        return { success: false, message: "Event not found" };
      }

      return { success: true, message: "Attendee added successfully" };
    } catch (error: any) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }
}

export default EventService;
