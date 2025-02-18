import { Request, Response } from "express";
import Event from "../models/Event";
import User, { IUser } from "../models/User";
import { EmailService } from "../services/emailService";

interface AuthRequest extends Request {
  user?: IUser;
}

class EventController {
  constructor(private emailService: EmailService = new EmailService()) {}

  // Utility to handle errors
  private handleError(res: Response, error: unknown, message: string = "Server error") {
    console.error(message, error);
    res.status(500).json({ message });
  }

  // Utility to find event by ID
  private async findEventById(eventId: string, res: Response) {
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return null;
      }
      return event;
    } catch (error) {
      this.handleError(res, error, "Error fetching event");
      return null;
    }
  }

  public createEvent = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { title, description, date, location, category, image, price = 0, type, capacity } = req.body;
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const newEvent = new Event({
        title, description, date, location, category,
        organizer: req.user._id, image, price, type, capacity, attendees: [],
      });

      const savedEvent = await newEvent.save();

      // Send event creation email
      if (req.user.email) {
        await this.emailService.sendEventCreationEmail(req.user.email, title, date.toString(), description);
      }

      // Notify all users
      const users = await User.find({}, "email");
      await Promise.all(
        users.map(user =>
          this.emailService.sendNewEventNotification(user.email, title, date.toString(), description)
            .catch(error => console.error(`Failed to notify ${user.email}:`, error))
        )
      );

      res.status(201).json(savedEvent);
    } catch (error) {
      this.handleError(res, error, "Error creating event");
    }
  };

  public updateEvent = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const updateData = req.body;
      const event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      // Notify attendees
      const attendees = await User.find({ _id: { $in: event.attendees } }, "email");
      await Promise.all(
        attendees.map(user =>
          this.emailService.sendEventUpdateEmail(user.email, event.title, event.date.toString(), event.description)
            .catch(error => console.error(`Failed to notify ${user.email}:`, error))
        )
      );

      res.json(event);
    } catch (error) {
      this.handleError(res, error, "Error updating event");
    }
  };

  public registerEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.body;
      const event = await this.findEventById(req.params.id, res);
      if (!event) return;

      if (event.attendees.includes(userId)) {
        res.status(400).json({ message: "User already registered" });
        return;
      }

      event.attendees.push(userId);
      await event.save();

      const user = await User.findById(userId);
      if (user) {
        await this.emailService.sendEventRegistrationEmail(user.email, event.title, event.date.toString());
      }

      res.status(200).json({ message: "Registered successfully" });
    } catch (error) {
      this.handleError(res, error, "Error registering for event");
    }
  };

  public unregisterEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.body;
      const event = await this.findEventById(req.params.id, res);
      if (!event) return;

      if (!event.attendees.includes(userId)) {
        res.status(400).json({ message: "User not registered" });
        return;
      }

      event.attendees = event.attendees.filter(attendee => attendee.toString() !== userId);
      await event.save();

      const user = await User.findById(userId);
      if (user) {
        await this.emailService.sendEventUnregistrationEmail(user.email, event.title, event.date.toString());
      }

      res.status(200).json({ message: "Unregistered successfully" });
    } catch (error) {
      this.handleError(res, error, "Error unregistering from event");
    }
  };

  public deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      this.handleError(res, error, "Error deleting event");
    }
  };

  public getEventById = async (req: Request, res: Response): Promise<void> => {
    const event = await this.findEventById(req.params.id, res);
    if (event) res.json(event);
  };

  public getAllEvents = async (_req: Request, res: Response): Promise<void> => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      this.handleError(res, error, "Error fetching events");
    }
  };

  public getCreatedEvents = async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user?._id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    try {
      const events = await Event.find({ organizer: req.user._id });
      res.json(events);
    } catch (error) {
      this.handleError(res, error, "Error fetching created events");
    }
  };

  public getRegisteredEvents = async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user?._id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    try {
      const events = await Event.find({ attendees: req.user._id });
      res.json(events);
    } catch (error) {
      this.handleError(res, error, "Error fetching registered events");
    }
  };
}

export default new EventController();
