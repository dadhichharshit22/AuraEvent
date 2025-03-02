import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthService } from "@/api/RegistrationAPI";

interface FormData {
  name: string;
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
}

export const useRegistration = (onRegister: (token: string) => void) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (field: keyof FormData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSendOTP = useCallback(async () => {
    try {
      await AuthService.sendOTP(formData.email);
      setOtpSent(true);
      toast.success("OTP sent to your email. Please check.");
    } catch (error) {
      handleError(error, "Failed to send OTP");
    }
  }, [formData.email]);

  const handleVerifyOTP = useCallback(async () => {
    try {
      const response = await AuthService.verifyOTPAndRegister(
        { email: formData.email, otp },
        formData
      );
      onRegister(response.token);
      toast.success("Registered successfully.");
      navigate("/");
    } catch (error) {
      handleError(error, "Registration failed");
    }
  }, [formData, otp, onRegister, navigate]);

  const handleError = (error: unknown, defaultMessage: string) => {
    const message = error instanceof Error ? error.message : defaultMessage;
    toast.error(message);
  };

  return {
    formData,
    otp,
    otpSent,
    setOtp,
    handleInputChange,
    handleSendOTP,
    handleVerifyOTP,
  };
};
