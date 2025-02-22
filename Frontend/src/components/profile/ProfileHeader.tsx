import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";
interface ProfileHeaderProps {
  name: string;
  username: string;
  role: string;
  avatarSrc: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  username,
  role,
  avatarSrc,
}) => {
  return (
    <CardHeader className="bg-purple-100 text-center p-6 rounded-t-lg">
      <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-white shadow-lg">
        <AvatarImage src={avatarSrc} alt={name} />
        <AvatarFallback className="bg-purple-300 text-4xl">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <CardTitle className="text-3xl font-bold text-purple-800">
        {name}
      </CardTitle>
      <p className="text-purple-600 mb-2">@{username}</p>
      <Badge className="bg-purple-200 text-purple-800">{role}</Badge>
    </CardHeader>
  );
};

export default ProfileHeader;
