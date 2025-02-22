import { Event, SearchParams } from './eventProps';

export interface NavbarProps {
  isRegistered: boolean;
  onLogout: () => void;
  onSearch: (params: SearchParams) => void;
}

export interface HomePageProps {
  isRegistered: boolean;
  onLogout: () => void;
  filteredEvents: Event[];
}