import axios from "axios";

const API_URL = "http://localhost:8085/api/auth";

export const sendOTP = async (email: string) => {
  return axios.post(`${API_URL}/send-otp`, { email });
};

export const verifyOTP = async (email: string, otp: string) => {
  return axios.post(`${API_URL}/verify-otp`, { email, otp });
};
