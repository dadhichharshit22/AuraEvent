import { Types } from "mongoose";
import { Event } from "../models/eventModal";

class EventRepository {
  async create(eventData: any) {
    const event = new Event(eventData);
    return event.save();
  }

  async findById(eventId: Types.ObjectId) {
    return Event.findById(eventId);
  }

  async update(eventId: Types.ObjectId, updateData: any) {
    return Event.findByIdAndUpdate(eventId, updateData, { new: true, runValidators: true });
  }

  async delete(eventId: Types.ObjectId) {
    return Event.findByIdAndDelete(eventId);
  }

  async findAll() {
    return Event.find();
  }

  async findByOrganizer(organizerId: Types.ObjectId) {
    return Event.find({ organizer: organizerId });
  }

  async findByAttendee(userId: Types.ObjectId) {
    return Event.find({ attendees: userId });
  }
}

export default new EventRepository();
