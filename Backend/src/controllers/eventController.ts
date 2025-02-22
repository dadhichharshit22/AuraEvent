import { Request, Response } from "express";
import { EventService } from "../services/eventService";
import { EmailService } from "../services/emailService";

export class EventController {
  private eventService: EventService;

  constructor() {
    const emailService = new EmailService();
    this.eventService = new EventService(emailService);
  }

  public createEvent = async (req: Request, res: Response): Promise<void> => {
    await this.eventService.createEvent(req, res);
  };

  public updateEvent = async (req: Request, res: Response): Promise<void> => {
    await this.eventService.updateEvent(req, res);
  };

  public registerEvent = async (req: Request, res: Response): Promise<void> => {
    await this.eventService.registerEvent(req, res);
  };

  public unregisterEvent = async (req: Request, res: Response): Promise<void> => {
    await this.eventService.unregisterEvent(req, res);
  };

  public deleteEvent = async (req: Request, res: Response): Promise<void> => {
    await this.eventService.deleteEvent(req, res);
  };

  public getEventById = async (req: Request, res: Response): Promise<void> => {
    await this.eventService.getEventById(req, res);
  };

  public getAllEvents = async (req: Request, res: Response): Promise<void> => {
    await this.eventService.getAllEvents(req, res);
  };

  public getCreatedEvents = async (req: Request, res: Response): Promise<void> => {
    await this.eventService.getCreatedEvents(req, res);
  };

  public getRegisteredEvents = async (req: Request, res: Response): Promise<void> => {
    await this.eventService.getRegisteredEvents(req, res);
  };
}
