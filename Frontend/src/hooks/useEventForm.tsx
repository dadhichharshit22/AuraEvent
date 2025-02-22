import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { eventService } from "../api/EventAPI";

interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image: string;
  type: string;
  capacity: string;
  price: number;
  highlights?: {
    ageInfo?: string;
    doorTime?: string;
    parkingInfo?: string;
  };
  faqs?: Array<{ question: string; answer: string }>;
}

export const useEventForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventData = location.state;

  const [formData, setFormData] = useState<EventFormData>({
    title: eventData?.title || "",
    description: eventData?.description || "",
    date: eventData?.date || "",
    location: eventData?.location || "",
    category: eventData?.category || "",
    image: eventData?.image || "",
    type: eventData?.type || "",
    capacity: eventData?.capacity || "",
    price: eventData?.price || 0,
    highlights: eventData?.highlights || {},
    faqs: eventData?.faqs || [],
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication failed!");
      return;
    }

    try {
      if (eventData?._id) {
        await eventService.updateEvent(eventData._id, formData, token);
        toast.success("Event updated successfully");
      } else {
        await eventService.createEvent(formData, token);
        toast.success("Event created successfully");
      }
      navigate("/");
    } catch (error) {
      toast.error(
        eventData?._id ? "Event update failed" : "Event creation failed"
      );
      console.error("Error:", error);
    }
  };

  return { formData, updateFormData, handleSubmit, eventData };
};
