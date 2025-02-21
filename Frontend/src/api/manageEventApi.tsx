import axios from "axios";

const API_URL = "http://localhost:8085/api/events";

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/created`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch events");
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    await axios.delete(`${API_URL}/${eventId}`, getAuthHeaders());
  } catch (error) {
    throw new Error("Failed to delete event");
  }
};
