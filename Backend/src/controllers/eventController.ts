import { Request, Response } from "express";
import Event from "../models/Event";
import nodemailer from "nodemailer";
import User, { IUser } from "../models/User";
import sendEmail from "../utils/emailService";
import { eventNotificationTemplate } from "../emailTemplate/eventNotification";
import { newEventNotification } from "../emailTemplate/newEventNotification";
import {
  registrationEmailTemplate,
  unregistrationEmailTemplate,
} from "../emailTemplate/eventRegistration";

interface AuthRequest extends Request {
  user?: IUser;
}

class EventController {
  private transporter;

  constructor() {
    
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dadhich.harshit222002@gmail.com",
        pass: "chvq cfvw neuo tanc",
      },
    });
  }


  public createEvent = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const {  title, description, date, location, category, image, price = 0, type, capacity } = req.body;

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
        type, capacity,
        attendees: [],
      });

      const savedEvent = await newEvent.save();

      
      const creatorEmailHtml = eventNotificationTemplate(
        title,
        date.toString(),
        description
      );
      await sendEmail(
        req.user?.email as string,
        "Event Created",
        "An event has been created.",
        creatorEmailHtml
      );

      
      const users = await User.find();

    
      users.forEach((user) => {
        const mailOptions = {
          from: "dadhich.harshit222002@gmail.com",
          to: user.email,
          subject: "New Event Added to EventManage!",
          html: newEventNotification(title, date.toString(), description),
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email to user:", user.email, error);
          }
        });
      });

      res.status(201).json(savedEvent);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  
  public updateEvent = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const {     title,
      description,
      date,
      location,
      organizer,
      image,
      price,
      type,
      capacity, } = req.body;

    try {
      const event = await Event.findByIdAndUpdate(
        req.params.id,
        { title, description, date, location, organizer, price, image, type, capacity},
        { new: true, runValidators: true }
      );

      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      
      const emailHtml = eventNotificationTemplate(
        title,
        date.toString(),
        description
      );
      for (const attendee of event.attendees) {
        await sendEmail(
          attendee.toString(),
          "Event Updated",
          "An event has been updated.",
          emailHtml
        );
      }

      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
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
      res.status(500).send("Server Error");
    }
  };


  public getCreatedEvents = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const events = await Event.find({ organizer: req.user?.id });
      res.json(events);
    } catch (error) {
      console.error("Error fetching created events:", error);
      res.status(500).send("Server Error");
    }
  };

  
  public getRegisteredEvents = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    if (!req.user || !req.user.id) {
      res.status(401).json({ msg: "User not authenticated" });
      return;
    }

    try {
      const events = await Event.find({ attendees: req.user.id });
      res.json(events);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  };

  public fetchAllEvents = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      console.error("Error fetching all events:", error);
      res.status(500).send("Server Error");
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
        res
          .status(400)
          .json({ message: "User already registered for this event" });
        return;
      }

      event.attendees.push(userId);
      await event.save();

      const user = await User.findById(userId);
      if (user) {
        const mailOptions = {
          from: "dadhich.harshit222002@gmail.com",
          to: user.email,
          subject: "Event Registration Confirmation",
          html: registrationEmailTemplate(event.title, event.date.toString()),
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(500).json({ message: "Error sending email" });
            return;
          }
        });
      }

      res.status(200).json({ message: "Registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  
  public unregisterEvent = async (
    req: Request,
    res: Response
  ): Promise<void> => {
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
        (attendee) => attendee !== userId
      );
      await event.save();

      const user = await User.findById(userId);
      if (user) {
        const mailOptions = {
          from: "dadhich.harshit222002@gmail.com",
          to: user.email,
          subject: "Event Unregistration Confirmation",
          html: unregistrationEmailTemplate(event.title, event.date.toString()),
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(500).json({ message: "Error sending email" });
            return;
          }
        });
      }

      res.status(200).json({ message: "Unregistered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}

export default new EventController();
