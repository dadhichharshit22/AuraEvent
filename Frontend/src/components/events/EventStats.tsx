import { Calendar, Users, MapPin } from 'lucide-react';
import React from 'react'
interface EventStatsProps {
  date: string;
  location: string;
  attendeesCount: number;
  capacity: number;
}

export const EventStats: React.FC<EventStatsProps> = ({
  date,
  location,
  attendeesCount,
  capacity,
}) => (
  <>
    <div className="flex items-center text-gray-500 mb-2">
      <Calendar className="w-4 h-4 mr-2" />
      <span className="text-sm">
        {new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
    </div>
    <div className="flex items-center text-gray-500 mb-2">
      <MapPin className="w-4 h-4 mr-2" />
      <span className="text-sm line-clamp-1">{location}</span>
    </div>
    <div className="flex items-center text-gray-500">
      <Users className="w-4 h-4 mr-2" />
      <span className="text-sm">
        {attendeesCount} / {capacity} attendees
      </span>
    </div>
  </>
);