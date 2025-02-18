import { Request, Response } from "express";
import EventService from "../services/EventService";
import EmailService from "../services/EmailService";
import { IUser } from "../models/User";

interface AuthRequest extends Request {
  user?: IUser;
}

class EventController {
  private eventService: EventService;
  private emailService: EmailService;

  constructor(eventService: EventService, emailService: EmailService) {
    this.eventService = eventService;
    this.emailService = emailService;
  }

  public createEvent = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const event = await this.eventService.createEvent(req.body, req.user?._id);

      if (req.user?.email) {
        await this.emailService.sendEventCreationEmail(req.user.email, event.title, event.date.toString(), event.description);
      }

      await this.emailService.notifyUsersAboutNewEvent(event);

      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  public updateEvent = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const updatedEvent = await this.eventService.updateEvent(req.params.id, req.body);

      if (!updatedEvent) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      await this.emailService.sendEventUpdateEmailToAttendees(updatedEvent);

      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  public registerEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.eventService.registerUserToEvent(req.params.id, req.body.userId);

      if (result.success) {
        await this.emailService.sendEventRegistrationEmail(result.userEmail, result.eventTitle, result.eventDate);
        res.status(200).json({ message: "Registered successfully" });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  public unregisterEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.eventService.unregisterUserFromEvent(req.params.id, req.body.userId);

      if (result.success) {
        await this.emailService.sendEventUnregistrationEmail(result.userEmail, result.eventTitle, result.eventDate);
        res.status(200).json({ message: "Unregistered successfully" });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}

export default EventController;
