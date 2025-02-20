import axios from 'axios';
import { Event } from '../types/Event';

const BASE_URL = 'http://localhost:8085/api';

export class EventService {
  private static getAuthHeader(token: string) {
    return { Authorization: `Bearer ${token}` };
  }

  static async fetchEventDetails(eventId: string, token: string): Promise<Event> {
    try {
      const response = await axios.get(
        `${BASE_URL}/events/${eventId}`,
        { headers: this.getAuthHeader(token) }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch event details');
    }
  }

  static async registerForEvent(eventId: string, userId: string, token: string): Promise<void> {
    try {
      await axios.post(
        `${BASE_URL}/events/${eventId}/register`,
        { userId },
        { headers: this.getAuthHeader(token) }
      );
    } catch (error) {
      throw new Error('Failed to register for event');
    }
  }

  static async unregisterFromEvent(eventId: string, userId: string, token: string): Promise<void> {
    try {
      await axios.post(
        `${BASE_URL}/events/${eventId}/unregister`,
        { userId },
        { headers: this.getAuthHeader(token) }
      );
    } catch (error) {
      throw new Error('Failed to unregister from event');
    }
  }
}