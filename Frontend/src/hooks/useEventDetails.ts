// hooks/useEvent.ts
import { useState, useEffect } from "react";
import { fetchEvent } from "../api/eventDetails";
import { Event } from "../types/Event";
import { getUserIdFromToken } from "../utils/getUserFromToken";

export const useEvent = (id: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken();

    fetchEvent(id, token || "").then((eventData) => {
      setEvent(eventData);
      setIsRegistered(eventData.attendees.includes(userId));
    });

  }, [id]);

  return { event, isRegistered };
};
