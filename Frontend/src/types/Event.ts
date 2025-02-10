export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  type: string;
  capacity: number;
  price: number;
  image: string;
  attendees: string[];
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
