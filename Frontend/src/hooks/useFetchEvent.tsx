import { useState, useEffect } from "react";
import { getAllEvents } from "../api/HomePageAPI";

export const useFetchEvents = (setFilteredEvents: (events: any[]) => void) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [setFilteredEvents]);

  return { events, loading };
};
