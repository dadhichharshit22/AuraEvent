import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getUserIdFromToken } from '../utils/userFromToken';

const useEventDetails = (id: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken();

    axios
      .get(`http://localhost:8085/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvent(response.data);
        setIsRegistered(response.data.attendees.includes(userId));
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        if (error.response?.status === 401) {
          toast.error("Unauthorized. Please log in again.");
        }
      });
  }, [id]);

  return { event, isRegistered };
};

export default useEventDetails;
