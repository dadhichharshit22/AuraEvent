import { useState, useEffect } from 'react';
import { Event, TimeLeft } from '../types/Event';
import { EventService } from '../api/eventDetails';
import { getUserIdFromToken } from '../utils/getUserFromToken';
import { toast } from 'react-toastify';

export const useEventDetails = (eventId: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem('token');
      const userId = getUserIdFromToken();

      try {
        const eventData = await EventService.fetchEventDetails(eventId, token);
        setEvent(eventData);
        setIsRegistered(eventData.attendees.includes(userId));
      } catch (error) {
        toast.error('Failed to fetch event details');
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (!event) return;

    const calculateTimeLeft = () => {
      const eventDate = new Date(event.date).getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [event]);

  return { event, isRegistered, timeLeft, setEvent, setIsRegistered };
};