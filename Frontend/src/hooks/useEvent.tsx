import { useState, useEffect } from "react";
import { Event, SearchParams } from "../types/eventProps";
import { EventService } from "../api/AppAPI";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventService = EventService.getInstance();
        const fetchedEvents = await eventService.getAllEvents();
        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (searchParams: SearchParams) => {
    let filtered = [...events];

    if (searchParams.location) {
      filtered = filtered.filter((event) =>
        event.location
          .toLowerCase()
          .includes(searchParams.location.toLowerCase())
      );
    }

    if (searchParams.tags) {
      const searchTags = searchParams.tags
        .toLowerCase()
        .split(",")
        .map((tag) => tag.trim());
      filtered = filtered.filter(
        (event) =>
          event.category &&
          searchTags.some((tag) => event.category.toLowerCase().includes(tag))
      );
    }

    setFilteredEvents(filtered);
  };

  return {
    events,
    filteredEvents,
    setFilteredEvents,
    handleSearch,
  };
};
