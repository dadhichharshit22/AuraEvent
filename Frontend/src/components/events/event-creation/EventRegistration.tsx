import React from "react";
import { Button } from "@/components/ui/button";

interface EventRegistrationProps {
  isRegistered: boolean;
  seatsLeft: number;
  handleRegister: () => void;
  handleUnregister: () => void;
}

const EventRegistration: React.FC<EventRegistrationProps> = ({
  isRegistered, seatsLeft, handleRegister, handleUnregister
}) => (
  <div className="space-y-4">
    <h3 className="font-medium text-lg text-purple-700">Registration</h3>
    {seatsLeft <= 10 && (
      <div className="bg-red-50 px-4 py-2 rounded-lg">
        <p className="text-red-600 font-medium text-sm animate-pulse">
          Only {seatsLeft} seats left!
        </p>
      </div>
    )}
    {isRegistered ? (
      <Button variant="destructive" className="w-full" onClick={handleUnregister}>
        Unregister
      </Button>
    ) : (
      <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleRegister} disabled={seatsLeft === 0}>
        {seatsLeft === 0 ? "Event Full" : "Register Now"}
      </Button>
    )}
  </div>
);

export default EventRegistration;
