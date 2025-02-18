import { Request, Response } from "express";
import Event from "../models/Event";
import crypto from "crypto";
import mongoose, { Mongoose } from "mongoose";
import { instance } from "../config/razorpay";
import { EmailService } from "services/emailService";

class PaymentService {
  // Capture payment method
  constructor(private emailService: EmailService) {
  }
  public static async capturePayment(req: Request, res: Response): Promise<void> {
    try {
      console.log("Request body:", req.body);

      const { eventId, userId }: { eventId: string; userId: string } = req.body;

      if (!eventId) {
        res.json({ success: false, message: "Please provide Event Id" });
        return;
      }

      const event = await Event.findById(eventId);
      console.log("Event:", event);
      if (!event) {
        res.status(404).json({ success: false, message: "Event not found" });
        return;
      }

      if (event?.attendees?.includes(new Mongoose.prototype.ObjectId(userId))) {
        res
          .status(400)
          .json({ success: false, message: "User is already Registered." });
        return;
      }

      const totalAmount: number = event?.price || 0;
      console.log("Total Amount:", totalAmount);
      const currency = "INR";
      const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random().toString(),
      };

      const paymentResponse = await instance.orders.create(options);

      console.log("Payment Response:", paymentResponse);
      res.json({ success: true, message: paymentResponse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Could not Initiate Order" });
    }
  }

  // Verify payment method
  public static async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId, userId } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !eventId || !userId) {
        res.status(400).json({ success: false, message: "Payment Failed" });
        return;
      }

      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET || "")
        .update(body)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        res.status(400).json({ success: false, message: "Payment Failed" });
        return;
      }

    
     
      const attendeeAdded = await this.addAttendee(eventId, userId);
      if (!attendeeAdded.success) {
        res.status(500).json(attendeeAdded);
        return;
      }

      res.status(200).json({ success: true, message: "Payment Verified" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  // Add attendee to event
  private static async addAttendee(
    eventId: string,
    userId: string
  ): Promise<{ success: boolean; message: string }> {
    if (!eventId || !userId) {
      return { success: false, message: "Please provide data for Event or User" };
    }
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

export default PaymentService;
