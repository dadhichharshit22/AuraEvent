import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/apiService';
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
      const response = await authApi.login(credentials);
      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', credentials.email);
      toast.success('Login successful');
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error('Login failed. Please try again.');
      return rejectWithValue(errorMessage);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', userData.email);
      toast.success('Registration successful');
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      toast.error('Registration failed. Please try again.');
      return rejectWithValue(errorMessage);
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData: any, { rejectWithValue }) => {
    try {
      await authApi.changePassword(passwordData);
      toast.success('Password changed successfully');
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to change password';
      toast.error('Failed to change password. Please try again.');
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      toast.info('Logged out successfully');
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      // Still remove the token even if the API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.email = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.email = null;
      });
  },
});

export const { setCookieConsent } = authSlice.actions;
export default authSlice.reducer;
