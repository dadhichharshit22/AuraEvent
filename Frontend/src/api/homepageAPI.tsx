
import axios from "axios";

const API_URL = "http://localhost:8085/api/events";

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllEvent`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
