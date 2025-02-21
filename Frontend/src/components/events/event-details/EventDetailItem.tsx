import React from 'react';
import { LucideIcon } from 'lucide-react'; // Import Lucide icons

interface EventDetailItemProps {
  icon: LucideIcon;  // Expecting a Lucide icon component
  label: string;     // The label text for this detail item (e.g., "Date", "Location")
  children: React.ReactNode;  // The content (usually text) displayed under the label
}

const EventDetailItem: React.FC<EventDetailItemProps> = ({ icon: Icon, label, children }) => (
  <div className="flex items-center space-x-2">
    {/* Icon with defined size and color */}
    <Icon className="w-5 h-5 text-purple-500" />
    <div className="flex-1">
      {/* Label styled with bold and smaller text */}
      <div className="font-semibold text-sm text-gray-700">{label}</div>
      {/* Children content (e.g., the actual event date or location) */}
      <div className="text-gray-500 text-sm">{children}</div>
    </div>
  </div>
);

export default EventDetailItem;
