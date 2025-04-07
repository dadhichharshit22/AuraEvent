import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:8085/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // Unauthorized - clear token and redirect to login
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Generic API service
export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, config);
  },

  post: <T, D = Record<string, unknown>>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.post<T, AxiosResponse<T>, D>(url, data, config);
  },

  put: <T, D = Record<string, unknown>>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.put<T, AxiosResponse<T>, D>(url, data, config);
  },

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.delete<T>(url, config);
  },
};

// Auth API
export const authApi = {
  login: (credentials: { email: string; password: string }) => {
    return apiService.post('/auth/login', credentials);
  },

  register: (userData: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    username: string;
  }) => {
    return apiService.post('/auth/register', userData);
  },

  logout: () => {
    return apiService.post('/auth/logout');
  },

  changePassword: (passwordData: {
    email: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    return apiService.post('/auth/change-password', passwordData);
  },

  getProfile: () => {
    return apiService.get('/users/profile');
  },

  setCookieConsent: () => {
    return apiService.post('/auth/set-cookie-consent');
  },
};

// Events API
export const eventsApi = {
  getAllEvents: () => {
    return apiService.get('/events/getAllEvent');
  },

  getEventById: (id: string) => {
    return apiService.get(`/events/${id}`);
  },

  createEvent: (formData: FormData) => {
    return api.post('/events', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateEvent: (id: string, formData: FormData) => {
    return api.put(`/events/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteEvent: (id: string) => {
    return apiService.delete(`/events/${id}`);
  },

  registerForEvent: (eventId: string, userId: string) => {
    return apiService.post(`/events/${eventId}/register`, { userId });
  },

  unregisterFromEvent: (eventId: string, userId: string) => {
    return apiService.post(`/events/${eventId}/unregister`, { userId });
  },

  getUserCreatedEvents: () => {
    return apiService.get('/events/created');
  },

  getUserRegisteredEvents: () => {
    return apiService.get('/events/registered');
  },
};

// Helper function to extract user ID from JWT token
export const getUserIdFromToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) return '';

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    return payload.userId || '';
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
    return '';
  }
};
