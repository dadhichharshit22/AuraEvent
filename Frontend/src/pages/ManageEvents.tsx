import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, Trash2, Plus, Calendar, Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:8085/api/events/created",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to fetch events");
      console.error("Error fetching created events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    navigate("/dashboard/create-event", { state: event });
  };

  const handleDelete = async () => {
    if (!selectedEventId) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:8085/api/events/${selectedEventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEvents(events.filter((event) => event._id !== selectedEventId));
      toast.success("Event deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete event");
      console.error("Error deleting event:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-xl text-gray-600">
          Loading your events...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
          <p className="text-gray-600 mt-2">
            Create and manage your upcoming events
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/create-event")}>
          <Plus className="w-5 h-5 mr-2" />
          Create Event
        </Button>
      </div>

      {events.length === 0 ? (
        <Card className="text-center p-8">
          <CardHeader>
            <div className="mx-auto bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <CardTitle className="mt-4">No events created yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Start by creating your first event</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={() => navigate("/dashboard/create-event")}>
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event._id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute flex  gap-2 top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    {event.type}
                  </Badge>
                  <Badge onClick={() => handleEdit(event)}
                >
                  <Pencil className="w-4 h-4 mr-2" />

                  </Badge>
                  <Badge
                    onClick={() => {
                      setSelectedEventId(event._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
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
              <CardFooter className="justify-end space-x-2">
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageEvents;
