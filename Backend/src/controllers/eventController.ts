import { Request, Response } from "express";
import EventService from "../services/eventService";

interface AuthRequest extends Request {
  user?: any;
}

class EventController {
  public async createEvent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const event = await EventService.createEvent(req.body, req.user);
      res.status(201).json(event);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Server error";
      res.status(500).json({ message: errorMessage });
    }
  }

  public async updateEvent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const event = await EventService.updateEvent(req.params.id, req.body);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json(event);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Server error";
      res.status(500).json({ message: errorMessage });
    }
  }

  public async registerForEvent(req: Request, res: Response): Promise<void> {
    try {
      const response = await EventService.registerForEvent(req.params.id, req.body.userId);
      res.status(200).json(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Bad request";
      res.status(400).json({ message: errorMessage });
    }
  }

  public async unregisterFromEvent(req: Request, res: Response): Promise<void> {
    try {
      const response = await EventService.unregisterFromEvent(req.params.id, req.body.userId);
      res.status(200).json(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Bad request";
      res.status(400).json({ message: errorMessage });
    }
  }

  public async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const event = await EventService.deleteEvent(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json({ message: "Event deleted successfully" });
    } catch (error: unknown) {
      res.status(500).json({ message: "Server error" });
    }
  }

  public async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const event = await EventService.getEventById(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json(event);
    } catch (error: unknown) {
      res.status(500).json({ message: "Server error" });
    }
  }

  public async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const events = await EventService.getAllEvents();
      res.json(events);
    } catch (error: unknown) {
      res.status(500).json({ message: "Server error" });
    }
  }

  public async getUserCreatedEvents(req: AuthRequest, res: Response): Promise<void> {
    try {
      const events = await EventService.getUserCreatedEvents(req.user._id);
      res.json(events);
    } catch (error: unknown) {
      res.status(500).json({ message: "Server error" });
    }
  }

  public async getUserRegisteredEvents(req: AuthRequest, res: Response): Promise<void> {
    try {
      const events = await EventService.getUserRegisteredEvents(req.user._id);
      res.json(events);
    } catch (error: unknown) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new EventController();
