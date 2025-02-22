import { useState, useEffect } from "react";
import axios from "axios";

export const useEventData = (
  setFilteredEvents: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/events/getAllEvent")
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        setError("Error fetching events. Please try again later.");
        setLoading(false);
      });
  }, [setFilteredEvents]);

  return { events, loading, error };
};
