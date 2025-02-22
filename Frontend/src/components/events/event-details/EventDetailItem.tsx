import React from 'react';
import { LucideIcon } from 'lucide-react'; 

interface EventDetailItemProps {
  icon: LucideIcon;  
  label: string;     
  children: React.ReactNode; 
}

const EventDetailItem: React.FC<EventDetailItemProps> = ({ icon: Icon, label, children }) => (
  <div className="flex items-center space-x-2">
    
    <Icon className="w-5 h-5 text-purple-500" />
    <div className="flex-1">
    
      <div className="font-semibold text-sm text-gray-700">{label}</div>
      
      <div className="text-gray-500 text-sm">{children}</div>
    </div>
  </div>
);

export default EventDetailItem;
