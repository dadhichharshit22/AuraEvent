import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '../../api/AuthAPI';
import { LoginCredentials } from '../../types/authProps';
import { toast } from 'react-toastify';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token'),
  email: localStorage.getItem('email'),
  loading: false,
  error: null,
};

// Async thunks for authentication
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', credentials.email);
      return response;
    } catch (error: any) {
      toast.error('Login failed. Please try again.');
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(userData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', userData.email);
      return response;
    } catch (error: any) {
      toast.error('Registration failed. Please try again.');
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData: any, { rejectWithValue }) => {
    try {
      await AuthService.changePassword(passwordData);
      toast.success('Password changed successfully');
      return true;
    } catch (error: any) {
      toast.error('Failed to change password. Please try again.');
      return rejectWithValue(error.message || 'Failed to change password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      toast.info('Logged out successfully');
    },
    setCookieConsent: (state) => {
      // This is just to track the cookie consent in the state if needed
      // The actual cookie is set by the backend
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setCookieConsent } = authSlice.actions;
export default authSlice.reducer;
