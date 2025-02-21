import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchEvents, deleteEvent } from "../api/manageEventApi";
import { Event } from "@/types/Event";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Calendar, Users, MapPin } from "lucide-react";

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleEdit = (event: Event) => navigate("/dashboard/create-event", { state: event });

  const confirmDelete = async () => {
    if (!selectedEventId) return;
    try {
      await deleteEvent(selectedEventId);
      setEvents(events.filter(event => event._id !== selectedEventId));
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
          <p className="text-gray-600 mt-2">Create and manage your upcoming events</p>
        </div>
        <Button onClick={() => navigate("/dashboard/create-event")}>
          <Plus className="w-5 h-5 mr-2" /> Create Event
        </Button>
      </header>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading your events...</p>
      ) : events.length === 0 ? (
        <Card className="text-center p-8">
          <CardHeader>
            <Calendar className="mx-auto w-8 h-8 text-gray-400" />
            <CardTitle className="mt-4">No events created yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Start by creating your first event</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={() => navigate("/dashboard/create-event")}>
              <Plus className="w-5 h-5 mr-2" /> Create Event
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <Card key={event._id} className="overflow-hidden">
              <div className="relative h-48">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute flex gap-2 top-2 right-2">
                  <button className="bg-gray-200 px-2 py-1 rounded text-xs" onClick={() => handleEdit(event)}>
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="bg-red-200 px-2 py-1 rounded text-xs" onClick={() => { setSelectedEventId(event._id); setShowDeleteModal(true); }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{event.description}</p>
                <div className="flex items-center text-gray-500 mt-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-500 mt-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-500 mt-2">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{event.attendees.length} / {event.capacity} attendees</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>Are you sure you want to delete this event? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageEvents;
