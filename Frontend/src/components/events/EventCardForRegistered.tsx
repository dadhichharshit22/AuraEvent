import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { EventStats } from './EventStats';
  import { Event } from '../../types/Event';
  import React from 'react'
  interface EventCardProps {
    event: Event;
    onViewDetails: (eventId: string) => void;
  }
  
  export const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => (
    <Card key={event._id} className="overflow-hidden">
      <div className="relative h-48">
        <img
          src={event.image || '/placeholder.svg'}
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
        <EventStats
          date={event.date}
          location={event.location}
          attendeesCount={event.attendees.length}
          capacity={event.capacity}
        />
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onViewDetails(event._id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );