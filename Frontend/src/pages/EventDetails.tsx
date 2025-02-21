import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getUserIdFromToken } from "../utils/getUserFromToken";
import {
  Calendar,
  MapPin,
  Users,
  Tag,
  ChevronLeft,
  Instagram,
  Linkedin,
  MessageCircle,
  Ticket,
  IndianRupee,
  Building,
  Clock,
} from "lucide-react";
import type { Event, TimeLeft } from "../types/Event";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/event-details/CountdownTimer";
import { EventModal } from "@/components/event-details/EventModal";
import { payEventFee } from "@/utils/payment";

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUnregisterModal, setShowUnregisterModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const navigate = useNavigate();

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

  const handleRegister = async () => {
    const userId = getUserIdFromToken();
    const token = localStorage.getItem("token");

    try {
      if (event.type === "Paid") {
        await payEventFee(token, event?._id, userId, { firstName: "Dadhich", lastName: "Shaabh", email: "abc@gmail.com" });
        setEvent((prevEvent) =>
          prevEvent
            ? {
              ...prevEvent,
              attendees: [...prevEvent.attendees, userId],
            }
            : null
        );
        setIsRegistered(true);
        setShowSuccessModal(true);
      }
      else {
        await axios.post(
          `http://localhost:8085/api/events/${id}/register`,
          { userId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEvent((prevEvent) =>
          prevEvent
            ? {
              ...prevEvent,
              attendees: [...prevEvent.attendees, userId],
            }
            : null
        );
        setIsRegistered(true);
        setShowSuccessModal(true);

      }

    } catch (error) {
      toast.error("Registration failed");
      console.error("Error during registration:", error);
    }
  };
  const handleUnregister = async () => {
    const userId = getUserIdFromToken();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:8085/api/events/${id}/unregister`,
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEvent((prevEvent) =>
        prevEvent
          ? {
            ...prevEvent,
            attendees: prevEvent.attendees.filter(
              (attendee) => attendee !== userId
            ),
          }
          : null
      );
      setIsRegistered(false);
      setShowUnregisterModal(false);
      toast.success("Successfully unregistered from the event");
    } catch (error) {
      toast.error("Failed to unregister");
      console.error("Error during unregistration:", error);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const categories = event.category
    .split(",")
    .map((category) => category.trim());
  const seatsLeft = event.capacity - event.attendees.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Button
          variant="ghost"
          className="group mb-8 flex items-center text-slate-500"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1 " />
          Back to Events
        </Button>

        <Card className="mb-8 overflow-hidden shadow-lg border-purple-200">
          <div className="aspect-video">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="bg-purple-700 text-white">
            <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <CountdownTimer timeLeft={timeLeft} />

            <p className="text-gray-600 leading-relaxed">{event.description}</p>

            <Separator className="border-purple-200" />

            <div className="grid gap-4">
              <EventDetailItem icon={Calendar} label="Date">
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </EventDetailItem>
              <EventDetailItem icon={Clock} label="Time">
                {new Date(event.date).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </EventDetailItem>
              <EventDetailItem icon={MapPin} label="Location">
                {event.location}
              </EventDetailItem>
              <EventDetailItem icon={Ticket} label="Event Type">
                {event.type}
              </EventDetailItem>
              {event.type === 'Paid' &&
                (<EventDetailItem icon={IndianRupee} label="Event Price">
                  <span className="font-medium text-red-500 underline">
                    {"₹ " + event?.price}
                  </span>
                </EventDetailItem>
                )}

              <EventDetailItem icon={Building} label="Capacity">
                {event.capacity}
              </EventDetailItem>
              <EventDetailItem icon={Users} label="Attendees">
                {event.attendees.length}
              </EventDetailItem>
              <EventDetailItem icon={Tag} label="Categories">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-100 text-purple-700"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </EventDetailItem>
            </div>

            <Separator className="border-purple-200" />

            <div className="space-y-4">
              <h3 className="font-medium text-lg text-purple-700">
                Registration
              </h3>
              {seatsLeft <= 10 && (
                <div className="bg-red-50 px-4 py-2 rounded-lg">
                  <p className="text-red-600 font-medium text-sm animate-pulse">
                    Only {seatsLeft} seats left!
                  </p>
                </div>
              )}
              {isRegistered ? (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setShowUnregisterModal(true)}
                >
                  Unregister
                </Button>
              ) : (
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleRegister}
                  disabled={seatsLeft === 0}
                >
                  {seatsLeft === 0 ? "Event Full" : event.type === 'Paid' ? "Pay now for registration" : "Register Now"}
                </Button>
              )}
            </div>

            <Separator className="border-purple-200" />

            <div className="space-y-4">
              <h3 className="font-medium text-lg text-purple-700">
                Share Event
              </h3>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  asChild
                >
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  asChild
                >
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  asChild
                >
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <EventModal
        type="success"
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <EventModal
        type="unregister"
        isOpen={showUnregisterModal}
        onClose={() => setShowUnregisterModal(false)}
        onConfirm={handleUnregister}
      />
    </div>
  );
};

const EventDetailItem: React.FC<{
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}> = ({ icon: Icon, label, children }) => (
  <div className="flex items-center text-gray-700">
    <Icon className="w-5 h-5 mr-3 text-purple-600" />
    <span className="font-medium mr-2 text-purple-800">{label}:</span>
    <span>{children}</span>
  </div>
);

export default EventDetails;