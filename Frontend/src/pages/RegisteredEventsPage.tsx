import React from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinnerForRegisteredEvent";
import { EventCard } from "../components/events/EventCardForRegistered";
import { EmptyEventState } from "../components/events/EmptyEventState";
import { useRegisteredEvents } from "../hooks/useRegisteredEvents";

const RegisteredEventsPage: React.FC = () => {
  const { events, loading, error } = useRegisteredEvents();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleViewDetails = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Registered Events
        </h1>
        <p className="text-gray-600 mt-2">Events you're participating in</p>
      </div>

      {events.length === 0 ? (
        <EmptyEventState onBack={() => window.history.back()} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisteredEventsPage;
