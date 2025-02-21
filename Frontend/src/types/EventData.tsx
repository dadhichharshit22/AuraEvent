export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  price?: number; // Optional field for paid events
  capacity: number;
  attendees: string[]; // Array of user IDs
  image?: string; // Optional image URL
  category: string; // <-- Ensure category is a string (or string[] if it's an array)
}


export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
