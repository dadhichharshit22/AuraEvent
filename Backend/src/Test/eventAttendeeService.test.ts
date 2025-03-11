import mongoose from "mongoose";
import { EventAttendeeService, EventNotFoundError, UserAlreadyRegisteredError, EventWrapper } from "../services/eventAttendeeService";
import { EventRepository } from "../repositories/eventAttendeeRepositories";

jest.mock("../repositories/eventAttendeeRepositories");

describe("EventAttendeeService", () => {
  let eventRepositoryMock: jest.Mocked<EventRepository>;
  let eventAttendeeService: EventAttendeeService;

  beforeEach(() => {
    eventRepositoryMock = {
      findById: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<EventRepository>;

    eventAttendeeService = new EventAttendeeService(eventRepositoryMock);
  });

  describe("registerAttendee", () => {
    const mockEventId = new mongoose.Types.ObjectId().toString();
    const mockUserId = new mongoose.Types.ObjectId().toString();

    it("should register a new attendee if not already registered", async () => {
      const mockEvent = { attendees: [], save: jest.fn() };
      const wrappedEvent = new EventWrapper(mockEvent); // Wrap the event
      eventRepositoryMock.findById.mockResolvedValueOnce(wrappedEvent);
      eventRepositoryMock.save.mockResolvedValueOnce(undefined);

      await eventAttendeeService.registerAttendee(mockEventId, mockUserId);

      expect(eventRepositoryMock.findById).toHaveBeenCalledWith(mockEventId);
      expect(eventRepositoryMock.save).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should throw EventNotFoundError if event does not exist", async () => {
      eventRepositoryMock.findById.mockResolvedValueOnce(null);

      await expect(eventAttendeeService.registerAttendee(mockEventId, mockUserId))
        .rejects.toThrow(EventNotFoundError);

      expect(eventRepositoryMock.findById).toHaveBeenCalledWith(mockEventId);
      expect(eventRepositoryMock.save).not.toHaveBeenCalled();
    });

    it("should throw UserAlreadyRegisteredError if user is already registered", async () => {
      const mockEvent = { 
        attendees: [new mongoose.Types.ObjectId(mockUserId)], 
        save: jest.fn() 
      };
      const wrappedEvent = new EventWrapper(mockEvent);
      eventRepositoryMock.findById.mockResolvedValueOnce(wrappedEvent);

      await expect(eventAttendeeService.registerAttendee(mockEventId, mockUserId))
        .rejects.toThrow(UserAlreadyRegisteredError);

      expect(eventRepositoryMock.findById).toHaveBeenCalledWith(mockEventId);
      expect(eventRepositoryMock.save).not.toHaveBeenCalled();
    });
  });
});
