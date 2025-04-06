export interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
  description: string;
  type: string;
  attendees?: string[];
  organizer?: string;
  price?: number;
}

export interface SearchParams {
  query?: string;
  category?: string;
  date?: string;
  location?: string;
  tags?: string;
  month?: string;
}
