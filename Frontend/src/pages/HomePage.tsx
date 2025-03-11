import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EventCard from "@/components/events/EventCard";
import ImageCarousel from "@/components/common/ImageCarousal";
import { useFetchEvents } from "../hooks/useFetchEvent";

interface HomepageProps {
  filteredEvents: any[];
  setFilteredEvents: React.Dispatch<React.SetStateAction<any[]>>;
  isRegistered: boolean;
  onLogout: () => void;
}

const HomePage: React.FC<HomepageProps> = ({ filteredEvents, setFilteredEvents }) => {
  const { events, loading } = useFetchEvents(setFilteredEvents);
  const navigate = useNavigate();

  const handleExplore = (eventId: string) => {
    if (!localStorage.getItem("token")) {
      toast.error("Unauthorized. Please Sign In to explore the event.");
      return;
    }
    navigate(`/event/${eventId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-custom-purple">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-white"></div>
      </div>
    );
  }

  const displayedEvents = filteredEvents.length > 0 ? filteredEvents : events;

  return (
    <div className="min-h-screen bg-gray-50">
      <ImageCarousel />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="space-y-8">
          <header className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-primary">Upcoming Events</h2>
            <p className="mt-2 text-gray-600">Discover amazing events happening near you</p>
          </header>

          {displayedEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {displayedEvents.map((event) => (
                <div key={event._id} className="transition-all duration-300 transform hover:-translate-y-2">
                  <EventCard event={event} onExplore={handleExplore} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white py-16 text-center shadow-sm">
              <p className="text-xl text-gray-600">No events available</p>
              <p className="mt-2 text-gray-500">Check back later for upcoming events</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
