import axios from "axios";
import { RegisterFormData, OTPData, AuthResponse } from "../types/sinUpProps";

const API_BASE_URL = "http://localhost:8085/api";

export class AuthService {
  static async sendOTP(email: string): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/otp/send-otp`, { email });
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw new Error("Error sending OTP. Please try again.");
    }
  }

  static async verifyOTPAndRegister(
    otpData: OTPData,
    userData: RegisterFormData
  ): Promise<AuthResponse> {
    try {
      await axios.post(`${API_BASE_URL}/otp/verify-otp`, otpData);
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error in verification or registration:", error);
      throw new Error("Error verifying OTP or registering. Please try again.");
    }
  }
}
