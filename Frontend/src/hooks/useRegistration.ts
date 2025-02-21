import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthService } from '../api/registrationApi';

export const useRegistration = (onRegister: (token: string) => void) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phoneNumber: '',
    password: '',
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendOTP = async () => {
    try {
      await AuthService.sendOTP(formData.email);
      setOtpSent(true);
      toast.success('OTP sent to your email. Please check.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send OTP';
      toast.error(message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await AuthService.verifyOTPAndRegister(
        { email: formData.email, otp },
        formData
      );
      onRegister(response.token);
      toast.success('Registered successfully.');
      navigate('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
    }
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