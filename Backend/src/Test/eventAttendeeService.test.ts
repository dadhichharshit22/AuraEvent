import { EventAttendeeService, EventNotFoundError, UserAlreadyRegisteredError } from "../services/eventAttendeeService";
import { EventRepository } from "../repositories/eventAttendeeRepositories";

jest.mock("../repositories/EventRepository");

describe("EventAttendeeService", () => {
  let eventRepository: jest.Mocked<EventRepository>;
  let eventAttendeeService: EventAttendeeService;

  beforeEach(() => {
    eventRepository = new EventRepository() as jest.Mocked<EventRepository>;
    eventAttendeeService = new EventAttendeeService(eventRepository);
  });

  test("throws EventNotFoundError if event does not exist", async () => {
    eventRepository.findById.mockResolvedValue(null);

    await expect(eventAttendeeService.registerAttendee("invalid_event_id", "user_id"))
      .rejects.toThrow(EventNotFoundError);
  });

  test("throws UserAlreadyRegisteredError if user is already registered", async () => {
    const mockEvent = {
      hasAttendee: jest.fn().mockReturnValue(true),
      addAttendee: jest.fn(),
    };
    eventRepository.findById.mockResolvedValue(mockEvent as any);

    await expect(eventAttendeeService.registerAttendee("event_id", "user_id"))
      .rejects.toThrow(UserAlreadyRegisteredError);
  });

  test("registers an attendee successfully", async () => {
    const mockEvent = {
      hasAttendee: jest.fn().mockReturnValue(false),
      addAttendee: jest.fn(),
    };
    eventRepository.findById.mockResolvedValue(mockEvent as any);
    eventRepository.save.mockResolvedValue();

    await expect(eventAttendeeService.registerAttendee("event_id", "new_user_id"))
      .resolves.toBeUndefined();

    expect(mockEvent.addAttendee).toHaveBeenCalledWith("new_user_id");
    expect(eventRepository.save).toHaveBeenCalledWith(mockEvent);
  });
});
