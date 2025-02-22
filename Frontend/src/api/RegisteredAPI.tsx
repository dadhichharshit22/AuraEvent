import axios from "axios";
import { Event } from "../types/eventProps";

const API_BASE_URL = "http://localhost:8085/api";

export class EventService {
  static async getRegisteredEvents(): Promise<Event[]> {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/events/registered`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching registered events:", error);
      throw new Error("Failed to fetch registered events");
    }
  }
}
