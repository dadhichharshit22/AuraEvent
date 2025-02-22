import axios from "axios";
import { Event } from "../types/eventProps";

const BASE_URL = "http://localhost:8085/api";

export class EventService {
  private static instance: EventService;

  private constructor() {}

  static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  async getAllEvents(): Promise<Event[]> {
    try {
      const response = await axios.get(`${BASE_URL}/events/getAllEvents`);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }
}
