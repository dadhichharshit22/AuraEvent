import axios from "axios";

const API_BASE_URL = "http://localhost:8085/api/events";

export const eventService = {
  createEvent: async (formData: any, token: string) => {
    return axios.post(API_BASE_URL, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateEvent: async (eventId: string, formData: any, token: string) => {
    return axios.put(`${API_BASE_URL}/${eventId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
