import React from "react";

interface EventDetailItemProps {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}

export const EventDetailItem: React.FC<EventDetailItemProps> = ({ icon: Icon, label, children }) => (
  <div className="flex items-center text-gray-700">
    <Icon className="w-5 h-5 mr-3 text-purple-600" />
    <span className="font-medium mr-2 text-purple-800">{label}:</span>
    <span>{children}</span>
  </div>
);
