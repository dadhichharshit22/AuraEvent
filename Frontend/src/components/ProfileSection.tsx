import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import React from 'react'
interface ProfileSectionProps {
  title: string;
  children: ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-purple-800 mb-2">{title}</h3>
    {children}
    <Separator className="my-6" />
  </div>
);

export default ProfileSection;