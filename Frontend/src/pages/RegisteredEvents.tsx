import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Users, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  attendees: string[];
  type: string;
  capacity: number;
  image: string;
}

const RegisteredEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8085/api/events/registered", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching registered events:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-xl text-gray-600">
          Loading your registered events...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Registered Events
        </h1>
        <p className="text-gray-600 mt-2">Events you're participating in</p>
      </div>

      {events.length === 0 ? (
        <Card className="text-center p-8">
          <CardHeader>
            <div className="mx-auto bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <CardTitle className="mt-4">No registered events found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You haven't registered for any events yet.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event._id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {event.description}
                </p>
                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {event.attendees.length} / {event.capacity} attendees
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisteredEvents;
