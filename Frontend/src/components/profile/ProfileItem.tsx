import { ReactNode } from "react";
import React from "react";
interface ProfileItemProps {
  icon: React.ElementType;
  label: string;
  value: ReactNode;
}

const ProfileItem: React.FC<ProfileItemProps> = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="flex items-center">
    <Icon className="mr-3 h-5 w-5 text-purple-600" />
    <span className="text-gray-700 font-medium">{label}:</span>
    <span className="ml-2 text-gray-600">{value}</span>
  </div>
);

export default ProfileItem;
