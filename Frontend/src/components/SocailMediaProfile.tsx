import { ReactElement } from "react";
import React from 'react'
interface SocialMediaItemProps {
  icon: ReactElement;
  label: string;
  value: string;
  link?: string;
}

const SocialMediaItem: React.FC<SocialMediaItemProps> = ({ icon, label, value, link }) => (
  <div className="flex items-center">
    {icon}
    <span className="text-gray-700 font-medium">{label}:</span>
    {link ? (
      <a href={link} className="ml-2 text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    ) : (
      <span className="ml-2 text-purple-600">{value}</span>
    )}
  </div>
);

export default SocialMediaItem;