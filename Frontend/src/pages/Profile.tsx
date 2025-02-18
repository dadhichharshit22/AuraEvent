
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Edit,
  Cake,
  Globe,
  Book,
  Music,
  Users,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface ProfileData {
  name: string;
  email: string;
  username: string;
  createdAt: string;
  role: string;
  location: string;
  type: string;
  capacity: number;
  age: number;
  phoneNumber: string;
  bio: string;
  interests: string[];
  socialMedia: {
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoading(true);
    axios
      .get(`http://localhost:8085/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Response ",response.data);
        // Simulating additional fields for demonstration
        setProfile({
          ...response.data,
          location: "Mumbai, India",
          capacity: 500,
          age: 28,
          bio: "Passionate event organizer with 5+ years of experience in creating unforgettable experiences.",
          interests: ["Music", "Technology", "Food", "Travel"],
          socialMedia: {
            twitter: "@eventorganizer",
            linkedin: "linkedin.com/in/eventorganizer",
            instagram: "@event.organizer",
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-xl text-purple-600">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            My Profile
          </h1>
          <p className="text-purple-600">
            Manage your personal information and preferences
          </p>
        </div>

        <Card className="border-purple-200 shadow-md mb-8">
          <CardHeader className="bg-purple-100 text-center p-6 rounded-t-lg">
            <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-white shadow-lg">
              <AvatarImage src="/placeholder-avatar.jpg" alt={profile.name} />
              <AvatarFallback className="bg-purple-300 text-4xl">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold text-purple-800">
              {profile.name}
            </CardTitle>
            <p className="text-purple-600 mb-2">@{profile.username}</p>
            <Badge className="bg-purple-200 text-purple-800">
              {profile.role}
            </Badge>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <ProfileItem icon={Mail} label="Email" value={profile.email} />
              <ProfileItem
                icon={Phone}
                label="Phone"
                value={profile.phoneNumber}
              />
              <ProfileItem
                icon={MapPin}
                label="Location"
                value={profile.location}
              />
              <ProfileItem
                icon={Cake}
                label="Age"
                value={`${profile.age} years old`}
              />
              <ProfileItem
                icon={Calendar}
                label="Joined"
                value={new Date(profile.createdAt).toLocaleDateString()}
              />
              <ProfileItem
                icon={Briefcase}
                label="Account Type"
                value={profile.type}
              />
              <ProfileItem
                icon={Users}
                label="Event Capacity"
                value={profile.capacity.toString()}
              />
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                About Me
              </h3>
              <p className="text-gray-600">{profile.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-100 text-purple-800"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                Social Media
              </h3>
              <div className="space-y-2">
                <SocialMediaItem
                  icon={Globe}
                  label="Twitter"
                  value={profile.socialMedia.twitter}
                />
                <SocialMediaItem
                  icon={Book}
                  label="LinkedIn"
                  value="LinkedIn Profile"
                  link={profile.socialMedia.linkedin}
                />
                <SocialMediaItem
                  icon={Music}
                  label="Instagram"
                  value={profile.socialMedia.instagram}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                Quick Stats
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <QuickStat
                  icon={Calendar}
                  label="Events Organized"
                  value="23"
                />
                <QuickStat icon={Users} label="Total Attendees" value="1,234" />
                <QuickStat icon={Star} label="Avg. Rating" value="4.8/5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProfileItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
}> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center">
    <Icon className="mr-3 h-5 w-5 text-purple-600" />
    <span className="text-gray-700 font-medium">{label}:</span>
    <span className="ml-2 text-gray-600">{value}</span>
  </div>
);

const SocialMediaItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
  link?: string;
}> = ({ icon: Icon, label, value, link }) => (
  <div className="flex items-center">
    <Icon className="mr-3 h-5 w-5 text-purple-600" />
    <span className="text-gray-700 font-medium">{label}:</span>
    {link ? (
      <a
        href={link}
        className="ml-2 text-purple-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {value}
      </a>
    ) : (
      <span className="ml-2 text-purple-600">{value}</span>
    )}
  </div>
);

const QuickStat: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
}> = ({ icon: Icon, label, value }) => (
  <div className="bg-purple-100 p-3 rounded-lg">
    <Icon className="h-6 w-6 text-purple-600 mx-auto mb-2" />
    <div className="text-sm text-purple-800 font-medium">{label}</div>
    <div className="text-lg font-bold text-purple-900">{value}</div>
  </div>
);

const ProfileSkeleton: React.FC = () => (
  <div className="min-h-screen bg-purple-50 py-16">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <Skeleton className="h-10 w-64 bg-purple-200 mx-auto mb-2" />
        <Skeleton className="h-5 w-48 bg-purple-200 mx-auto" />
      </div>

      <Card className="border-purple-200 shadow-md mb-8">
        <CardHeader className="bg-purple-100 text-center p-6 rounded-t-lg">
          <Skeleton className="h-32 w-32 rounded-full bg-purple-200 mx-auto mb-4" />
          <Skeleton className="h-8 w-48 bg-purple-200 mx-auto mb-2" />
          <Skeleton className="h-5 w-32 bg-purple-200 mx-auto mb-2" />
          <Skeleton className="h-6 w-24 bg-purple-200 mx-auto" />
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-full bg-purple-100" />
          ))}
          <Separator className="my-6" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-48 bg-purple-100" />
              <Skeleton className="h-4 w-full bg-purple-100" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-center">
        <Skeleton className="h-10 w-32 bg-purple-200 mx-auto" />
      </div>
    </div>
  </div>
);

export default Profile;

