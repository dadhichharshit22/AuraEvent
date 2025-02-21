// src/hooks/useAuth.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendOTP, verifyOTP } from "../api/forgotPassword";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      await sendOTP(email);
      setOtpSent(true);
      localStorage.setItem("email", email);
      toast.success("OTP sent to your email. Please check.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await verifyOTP(email, otp);
      toast.success("OTP verified successfully.");
      navigate("/change-password");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return {
    email,
    setEmail,
    otp,
    setOtp,
    otpSent,
    handleSendOTP,
    handleVerifyOTP,
  };
};
