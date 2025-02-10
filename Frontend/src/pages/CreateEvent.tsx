import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Plus,
  ArrowLeft,
  Calendar,
  MapPin,
  ImageIcon,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EventBasicInfo } from "../components/event-creation/EventBasicInfo";
import { EventDateTime } from "../components/event-creation/EventDateTime";
import { EventLocation } from "../components/event-creation/EventLocation";
import { EventDetails } from "../components/event-creation/EventDetails";
import { EventImage } from "../components/event-creation/EventImage";
import axios from "axios";

interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image: string;
  type: string;
  capacity: string;
  price:number;
  highlights?: {
    ageInfo?: string;
    doorTime?: string;
    parkingInfo?: string;
  };
  faqs?: Array<{ question: string; answer: string }>;
}

const CreateEvent: React.FC = () => {
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
    price:eventData?.price || 0,
    highlights: eventData?.highlights || {},
    faqs: eventData?.faqs || [],
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      if (eventData?._id) {
        await axios.put(
          `http://localhost:8085/api/events/${eventData._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Event updated successfully");
      } else {
        await axios.post("http://localhost:8085/api/events", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Event created successfully");
      }
      navigate("/dashboard/manage-events");
    } catch (error) {
      toast.error(
        eventData?._id ? "Event update failed" : "Event creation failed"
      );
      console.error("Error:", error);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard/manage-events")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">
              {eventData?._id ? "Edit event" : "Create new event"}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="">
          <Card className="border-none w-full">
            <div className="w-full flex justify-end">
            <Button className="" onClick={handleSubmit}>
              {eventData?._id ? "Save changes" : "Publish event"}
            </Button>
            </div>
            <CardContent className="p-6">
              <Accordion type="single" collapsible defaultValue="info">
                <AccordionItem value="info">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Basic Info
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <EventBasicInfo
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="datetime">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Date and time
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <EventDateTime
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="location">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Location
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <EventLocation
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="image">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Event image
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <EventImage
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="details">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Additional details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <EventDetails
                      formData={formData}
                      updateFormData={updateFormData}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
