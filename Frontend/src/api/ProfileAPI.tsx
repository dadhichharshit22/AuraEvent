import axios from "axios";

export const fetchProfileData = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:8085/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching profile data");
  }
};
