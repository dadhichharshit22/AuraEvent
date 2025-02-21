import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Event } from '../types/Event';
import { EventService } from '../api/manageEventApi';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
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
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await EventService.deleteEvent(eventId);
      setEvents(events.filter((event) => event._id !== eventId));
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
  }, []);

  return { events, isLoading, deleteEvent };
};