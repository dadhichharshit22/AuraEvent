import EventService from "../services/eventAttendessService";
import mongoose from "mongoose";
import { Event } from "../models/event";

jest.mock("../models/Event");
jest.mock("mongoose", () => ({
  ...jest.requireActual("mongoose"),
  Types: {
    ...jest.requireActual("mongoose").Types,
    ObjectId: jest.fn(
      () => new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")
    ),
  },
}));

describe("EventService", () => {
  describe("isUserRegistered", () => {
    it("should return true if user is registered", () => {
      const mockEvent = {
        attendees: [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
      };

      const result = EventService.isUserRegistered(
        mockEvent,
        "507f1f77bcf86cd799439011"
      );
      expect(result).toBe(true);
    });

    it("should return false if user is not registered", () => {
      const mockEvent = {
        attendees: [new mongoose.Types.ObjectId("507f1f77bcf86cd799439011")],
      };

      const result = EventService.isUserRegistered(
        mockEvent,
        "507f1f77bcf86cd799439022"
      );
      expect(result).toBe(false);
    });
  });

  describe("addAttendee", () => {
    it("should add an attendee successfully", async () => {
      const mockEvent = { id: "1", name: "Event 1", attendees: [] };
      (Event.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...mockEvent,
        attendees: ["507f1f77bcf86cd799439011"],
      });

      const result = await EventService.addAttendee(
        "1",
        "507f1f77bcf86cd799439011"
      );
      expect(result).toEqual({
        success: true,
        message: "Attendee added successfully",
      });
    });

    it("should return an error message if event is not found", async () => {
      (Event.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const result = await EventService.addAttendee(
        "999",
        "507f1f77bcf86cd799439011"
      );
      expect(result).toEqual({
        success: false,
        message: "Event not found",
      });
    });

    it("should handle errors and return an error message", async () => {
      const error = new Error("Database error");
      (Event.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);

      const result = await EventService.addAttendee(
        "1",
        "507f1f77bcf86cd799439011"
      );
      expect(result).toEqual({
        success: false,
        message: "Database error",
      });
    });
  });
});
