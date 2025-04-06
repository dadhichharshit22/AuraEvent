import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EventService } from '../../api/AppAPI';
import { Event, SearchParams } from '../../types/eventProps';
import axios from 'axios';
import { toast } from 'react-toastify';

interface EventState {
  events: Event[];
  filteredEvents: Event[];
  selectedEvent: Event | null;
  registeredEvents: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  filteredEvents: [],
  selectedEvent: null,
  registeredEvents: [],
  loading: false,
  error: null,
};

// Async thunks for events
export const fetchAllEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const eventService = EventService.getInstance();
      const events = await eventService.getAllEvents();
      return events;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch events');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8085/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Unauthorized. Please log in again.');
      }
      return rejectWithValue(error.message || 'Failed to fetch event details');
    }
  }
);

export const fetchRegisteredEvents = createAsyncThunk(
  'events/fetchRegistered',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8085/api/events/registered`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch registered events');
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (formData: any, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await axios.post('http://localhost:8085/api/events', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success('Event created successfully');
      dispatch(fetchAllEvents());
      return response.data;
    } catch (error: any) {
      toast.error('Failed to create event');
      return rejectWithValue(error.message || 'Failed to create event');
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    filterEvents: (state, action: PayloadAction<SearchParams>) => {
      const { query, category, date } = action.payload;
      
      let filtered = [...state.events];
      
      if (query) {
        const searchTerm = query.toLowerCase();
        filtered = filtered.filter(
          (event) =>
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
      }
      
      if (category && category !== 'all') {
        filtered = filtered.filter((event) => event.category === category);
      }
      
      if (date) {
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.date);
          const searchDate = new Date(date);
          return eventDate.toDateString() === searchDate.toDateString();
        });
      }
      
      state.filteredEvents = filtered;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Events
      .addCase(fetchAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
        state.filteredEvents = action.payload;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Event By Id
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Registered Events
      .addCase(fetchRegisteredEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegisteredEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.registeredEvents = action.payload;
      })
      .addCase(fetchRegisteredEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { filterEvents, clearSelectedEvent } = eventSlice.actions;
export default eventSlice.reducer;
