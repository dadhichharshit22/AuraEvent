import axios from "axios";

const API_URL = "http://localhost:8085/api/events";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication token not found.");
  return { headers: { Authorization: `Bearer ${token}` } };
};

const EventService = {
  fetchCreatedEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/created`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Failed to fetch events"
      );
    }
  },

  deleteEvent: async (eventId: string) => {
    try {
      await axios.delete(`${API_URL}/${eventId}`, getAuthHeaders());
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Failed to delete event"
      );
    }
  },
};

export default EventService;
