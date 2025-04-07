import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { eventsApi, getUserIdFromToken } from '../../api/apiService';
import { Event, SearchParams } from '../../types/eventProps';
import { toast } from 'react-toastify';

interface EventState {
  events: Event[];
  filteredEvents: Event[];
  selectedEvent: Event | null;
  registeredEvents: Event[];
  loading: boolean;
  error: string | null;
  isRegistered: boolean;
}

const initialState: EventState = {
  events: [],
  filteredEvents: [],
  selectedEvent: null,
  registeredEvents: [],
  loading: false,
  error: null,
  isRegistered: false,
};

// Async thunks for events
export const fetchAllEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await eventsApi.getAllEvents();
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch events';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await eventsApi.getEventById(id);

      // Get user ID from token to check if user is registered
      const userId = getUserIdFromToken();
      const event = response.data as Event;
      const isUserRegistered = event.attendees?.includes(userId) || false;

      return {
        event,
        isRegistered: isUserRegistered
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch event details';
      toast.error('Failed to fetch event details');
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerForEvent = createAsyncThunk(
  'events/register',
  async ({ eventId, userId }: { eventId: string, userId: string }, { rejectWithValue }) => {
    try {
      await eventsApi.registerForEvent(eventId, userId);
      toast.success('Successfully registered for the event');
      return { eventId, userId };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to register for event';
      toast.error('Failed to register for event');
      return rejectWithValue(errorMessage);
    }
  }
);

export const unregisterFromEvent = createAsyncThunk(
  'events/unregister',
  async ({ eventId, userId }: { eventId: string, userId: string }, { rejectWithValue }) => {
    try {
      await eventsApi.unregisterFromEvent(eventId, userId);
      toast.success('Successfully unregistered from the event');
      return { eventId, userId };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to unregister from event';
      toast.error('Failed to unregister from event');
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchRegisteredEvents = createAsyncThunk(
  'events/fetchRegistered',
  async (_, { rejectWithValue }) => {
    try {
      const response = await eventsApi.getUserRegisteredEvents();
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch registered events';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await eventsApi.createEvent(formData);
      toast.success('Event created successfully');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create event';
      toast.error('Failed to create event');
      return rejectWithValue(errorMessage);
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
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload as Event[];
        state.filteredEvents = action.payload as Event[];
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
      .addCase(fetchEventById.fulfilled, (state, action: PayloadAction<{event: Event, isRegistered: boolean}>) => {
        state.loading = false;
        state.selectedEvent = action.payload.event;
        state.isRegistered = action.payload.isRegistered;
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
      .addCase(fetchRegisteredEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredEvents = action.payload as Event[];
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
      })
      // Register for Event
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = true;
        if (state.selectedEvent) {
          state.selectedEvent.attendees.push(action.payload.userId);
        }
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Unregister from Event
      .addCase(unregisterFromEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unregisterFromEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = false;
        if (state.selectedEvent) {
          state.selectedEvent.attendees = state.selectedEvent.attendees.filter(
            (attendee) => attendee !== action.payload.userId
          );
        }
      })
      .addCase(unregisterFromEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { filterEvents, clearSelectedEvent } = eventSlice.actions;
export default eventSlice.reducer;
