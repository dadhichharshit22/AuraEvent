import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginCredentials } from '../types/Login';
import { AuthService } from '../api/LoginApi';

export const useLogin = (onLoginSuccess: (token: string) => void) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(credentials);
      onLoginSuccess(response.token);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};