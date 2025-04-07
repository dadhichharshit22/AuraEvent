import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/apiService';
import { ProfileData } from '../../types/profileProps';
import { toast } from 'react-toastify';

interface UserState {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getProfile();
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
      return rejectWithValue(errorMessage);
    }
  }
);

// Default profile data for when the API call fails or user is not logged in
export const getDefaultProfile = () => ({
  name: "John Doe",
  username: "johndoe",
  role: "User",
  avatarSrc: "/placeholder-avatar.jpg",
  email: "johndoe@example.com",
  phoneNumber: "N/A",
  location: "Unknown",
  age: "N/A",
  createdAt: new Date().toISOString(),
  type: "Basic",
  capacity: 0,
  bio: "This user has not provided a bio.",
  interests: [],
  socialMedia: {
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
  },
});

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<ProfileData>, { rejectWithValue }) => {
    try {
      // This is a placeholder - you'll need to implement the API call
      // const response = await authApi.updateProfile(profileData);

      // For now, we'll just simulate a successful update
      toast.success('Profile updated successfully');

      // Refresh the profile data
      // We'll handle this in the component after the update is complete

      return profileData;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error('Failed to update profile');
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload as ProfileData;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer;
