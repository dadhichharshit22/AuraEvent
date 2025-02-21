import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, ImageIcon, Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EventBasicInfo } from "../components/events/event-creation/EventBasicInfo";
import { EventDateTime } from "../components/events/event-creation/EventDateTime";
import { EventLocation } from "../components/events/event-creation/EventLocation";
import { EventDetails } from "../components/events/event-creation/EventDetails";
import { EventImage } from "../components/events/event-creation/EventImage";
import { useEventForm } from "../hooks/useEventForm";

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, handleSubmit, eventData } = useEventForm();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/manage-events")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">
              {eventData?._id ? "Edit event" : "Create new event"}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-none w-full">
          <div className="w-full flex justify-end">
            <Button onClick={handleSubmit}>
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
                  <EventBasicInfo formData={formData} updateFormData={updateFormData} />
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
                  <EventDateTime formData={formData} updateFormData={updateFormData} />
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
                  <EventLocation formData={formData} updateFormData={updateFormData} />
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
                  <EventImage formData={formData} updateFormData={updateFormData} />
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
                  <EventDetails formData={formData} updateFormData={updateFormData} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateEvent;
