
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Event } from '../types/Event';
import EventService from '../apiServices/ManageEventAPI';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedEvents = await EventService.fetchCreatedEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      toast.error('Failed to fetch events');
      console.error('Error fetching created events:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await EventService.deleteEvent(eventId);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      toast.success('Event deleted successfully');
      return true;
    } catch (error) {
      toast.error('Failed to delete event');
      console.error('Error deleting event:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, isLoading, deleteEvent: handleDeleteEvent, fetchEvents };
};
