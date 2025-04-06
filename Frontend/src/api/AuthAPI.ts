import axios from 'axios';
import { LoginCredentials } from '../types/authProps';

const API_BASE_URL = 'http://localhost:8085/api/auth';

export class AuthService {
  static async login(credentials: LoginCredentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(userData: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async changePassword(passwordData: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/change-password`, passwordData);
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  static async setCookieConsent() {
    try {
      const response = await axios.post(`${API_BASE_URL}/set-cookie-consent`, {});
      return response.data;
    } catch (error) {
      console.error('Set cookie consent error:', error);
      throw error;
    }
  }
}
