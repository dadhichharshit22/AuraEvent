import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageCarousel from "../components/ImageCarousal";
import EventCard from "../components/EventCard";
import { useEventData } from "../hooks/useEventData";

interface HomepageProps {
  isRegistered: boolean;
  onLogout: () => void;
  filteredEvents: any[];
  setFilteredEvents: React.Dispatch<React.SetStateAction<any[]>>;
}

const HomePage: React.FC<HomepageProps> = ({ filteredEvents, setFilteredEvents }) => {
  const navigate = useNavigate();
  const { events, loading, error } = useEventData(setFilteredEvents);

  const handleExplore = (eventId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please SignIn to explore the event.");
    } else {
      navigate(`/event/${eventId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-custom-purple flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ImageCarousel />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="space-y-8">
          <div className="mb-8">
            <h2 className="text-center text-2xl text-primary font-bold">
              Upcoming Events
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Discover amazing events happening near you
            </p>
          </div>
          {(filteredEvents.length > 0 ? filteredEvents : events).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(filteredEvents.length > 0 ? filteredEvents : events).map((event) => (
                <div key={event._id} className="transform transition-all duration-300 hover:-translate-y-2">
                  <EventCard event={event} onExplore={handleExplore} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white shadow-sm">
              <p className="text-xl text-gray-600">No events available</p>
              <p className="text-gray-500 mt-2">
                Check back later for upcoming events
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
