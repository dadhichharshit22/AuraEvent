
import { Request, Response } from "express";
import Event from "../models/Event";
import User, { IUser } from "../models/User";
import { EmailService } from "../services/emailService";

interface AuthRequest extends Request {
  user?: IUser;
}

class EventController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  public createEvent = async (req: AuthRequest, res: Response): Promise<void> => {
    const { 
      title, 
      description, 
      date, 
      location, 
      category, 
      image, 
      price = 0, 
      type, 
      capacity 
    } = req.body;

    try {
      const newEvent = new Event({
        title,
        description,
        date,
        location,
        category,
        organizer: req.user?._id,
        image,
        price,
        type,
        capacity,
        attendees: [],
      });

      const savedEvent = await newEvent.save();

      // Send confirmation email to event creator
      if (req.user?.email) {
        await this.emailService.sendEventCreationEmail(
          req.user.email,
          title,
          date.toString(),
          description
        );
      }

      // Notify all users about new event
      const users = await User.find();
      await Promise.all(
        users.map(user =>
          this.emailService.sendNewEventNotification(
            user.email,
            title,
            date.toString(),
            description
          ).catch(error => 
            console.error(`Failed to send notification to ${user.email}:`, error)
          )
        )
      );

      res.status(201).json(savedEvent);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  public updateEvent = async (req: AuthRequest, res: Response): Promise<void> => {
    const { 
      title,
      description,
      date,
      location,
      image,
      price,
      type,
      capacity 
    } = req.body;

    try {
      const event = await Event.findByIdAndUpdate(
        req.params.id,
        { 
          title, 
          description, 
          date, 
          location, 
          image, 
          price, 
          type, 
          capacity 
        },
        { new: true, runValidators: true }
      );

      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      // Notify all attendees about the update
      const attendeeUsers = await User.find({
        _id: { $in: event.attendees }
      });

      await Promise.all(
        attendeeUsers.map(user =>
          this.emailService.sendEventUpdateEmail(
            user.email,
            title,
            date.toString(),
            description
          ).catch(error => 
            console.error(`Failed to send update notification to ${user.email}:`, error)
          )
        )
      );

      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  public registerEvent = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    const { id } = req.params;

    try {
      const event = await Event.findById(id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      if (event.attendees.includes(userId)) {
        res.status(400).json({ message: "User already registered for this event" });
        return;
      }

      event.attendees.push(userId);
      await event.save();

      const user = await User.findById(userId);
      if (user) {
        await this.emailService.sendEventRegistrationEmail(
          user.email,
          event.title,
          event.date.toString()
        );
      }

      res.status(200).json({ message: "Registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  public unregisterEvent = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    const { id } = req.params;

    try {
      const event = await Event.findById(id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      if (!event.attendees.includes(userId)) {
        res.status(400).json({ message: "User not registered for this event" });
        return;
      }

      event.attendees = event.attendees.filter(
        attendee => attendee.toString() !== userId
      );
      await event.save();

      const user = await User.findById(userId);
      if (user) {
        await this.emailService.sendEventUnregistrationEmail(
          user.email,
          event.title,
          event.date.toString()
        );
      }

      res.status(200).json({ message: "Unregistered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  // Other methods remain the same but with improved error handling
  public deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  public getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json(event);
    } catch (error) {
      console.error("Error getting event details:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  public getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      console.error("Error fetching all events:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  public getCreatedEvents = async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user?._id) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    try {
      const events = await Event.find({ organizer: req.user._id });
      res.json(events);
    } catch (error) {
      console.error("Error fetching created events:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  public getRegisteredEvents = async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user?._id) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    try {
      const events = await Event.find({ attendees: req.user._id });
      res.json(events);
    } catch (error) {
      console.error("Error fetching registered events:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
}

export default new EventController();