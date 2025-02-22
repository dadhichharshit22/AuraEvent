export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  price?: number; 
  capacity: number;
  attendees: string[]; 
  image?: string; 
  category: string; 
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface SearchParams {
  location: string;
  tags: string;
  month: string;
}
