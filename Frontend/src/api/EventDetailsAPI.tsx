import axios from "axios";

const API_URL = "http://localhost:8085/api/events/";

export const fetchEvent = async (id: string, token: string) => {
  const response = await axios.get(`${API_URL}${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const registerForEvent = async (
  id: string,
  userId: string,
  token: string
) => {
  await axios.post(
    `${API_URL}${id}/register`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const unregisterFromEvent = async (
  id: string,
  userId: string,
  token: string
) => {
  await axios.post(
    `${API_URL}${id}/unregister`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
