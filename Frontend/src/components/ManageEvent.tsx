import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EventCard from "./EventCard";
import { fetchEvents, deleteEvent } from "../api/manageEventApi";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  capacity: number;
  attendees: string[];
  image: string;
}

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const eventData = await fetchEvents();
      setEvents(eventData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event: Event) => navigate("/dashboard/create-event", { state: event });

  const handleDelete = async () => {
    if (!selectedEventId) return;
    try {
      await deleteEvent(selectedEventId);
      setEvents(events.filter((event) => event._id !== selectedEventId));
      toast.success("Event deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-xl text-gray-600">Loading your events...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
          <p className="text-gray-600 mt-2">Create and manage your upcoming events</p>
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
            <EventCard
              key={event._id}
              event={event}
              onEdit={() => handleEdit(event)}
              onDelete={() => {
                setSelectedEventId(event._id);
                setShowDeleteModal(true);
              }}
            />
          ))}
        </div>
      )}

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>Are you sure you want to delete this event? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageEvents;
