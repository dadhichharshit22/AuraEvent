import { EventAttendeeRepository } from "../repositories/eventAttendeeRepositories";
import { Event } from "../../src/models/eventModal";
import { EventWrapper } from "../../src/services/eventAttendeeService";
import mongoose from "mongoose";

jest.mock("../../src/models/eventModal"); // Mock the Mongoose model

describe("EventAttendeeRepository", () => {
  let eventRepository: EventAttendeeRepository;

  beforeEach(() => {
    eventRepository = new EventAttendeeRepository();
    jest.clearAllMocks(); // Reset mocks before each test
  });

  describe("findById", () => {
    it("should return an EventWrapper if event is found", async () => {
      const mockEvent = { _id: new mongoose.Types.ObjectId(), name: "Tech Meetup" };
      (Event.findById as jest.Mock).mockResolvedValue(mockEvent);

      const result = await eventRepository.findById(mockEvent._id.toString());

      expect(Event.findById).toHaveBeenCalledWith(mockEvent._id.toString());
      expect(result).toBeInstanceOf(EventWrapper);
      expect(result?.getEvent()).toEqual(mockEvent); // Use getter method instead
    });

    it("should return null if event is not found", async () => {
      (Event.findById as jest.Mock).mockResolvedValue(null);

      const result = await eventRepository.findById("unknown_event_id");

      expect(Event.findById).toHaveBeenCalledWith("unknown_event_id");
      expect(result).toBeNull();
    });
  });

  describe("save", () => {
    it("should save the event", async () => {
      const mockEvent = {
        save: jest.fn().mockResolvedValue(undefined),
      };
      const eventWrapper = new EventWrapper(mockEvent as any);

      await eventRepository.save(eventWrapper);

      expect(mockEvent.save).toHaveBeenCalled();
    });

    it("should throw an error if saving fails", async () => {
      const mockEvent = {
        save: jest.fn().mockRejectedValue(new Error("Save failed")),
      };
      const eventWrapper = new EventWrapper(mockEvent as any);

      await expect(eventRepository.save(eventWrapper)).rejects.toThrow("Save failed");
    });
  });
});
