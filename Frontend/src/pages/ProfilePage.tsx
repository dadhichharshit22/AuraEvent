import React from "react";
import { useProfile } from "@/hooks/useProfile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileItem from "@/components/profile/ProfileItem";
import ProfileSection from "@/components/profile/ProfileSection";
import SocialMediaItem from "@/components/profile/SocailMediaProfile";
import {
  Mail,
  Phone,
  MapPin,
  Cake,
  Calendar,
  Briefcase,
  Users,
  Music,
  Globe,
  Book,
} from "lucide-react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile: React.FC = () => {
  const { profile, error } = useProfile();

  // if data not available
  const defaultProfile = {
    name: "John Doe",
    username: "johndoe",
    role: "User",
    avatarSrc: "/placeholder-avatar.jpg",
    email: "johndoe@example.com",
    phoneNumber: "N/A",
    location: "Unknown",
    age: "N/A",
    createdAt: new Date().toISOString(),
    type: "Basic",
    capacity: 0,
    bio: "This user has not provided a bio.",
    interests: [],
    socialMedia: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  };

  const currentProfile = profile || defaultProfile;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-xl text-purple-600">
          {error || "Failed to load profile"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader
          name={currentProfile.name}
          username={currentProfile.username}
          role={currentProfile.role}
          avatarSrc={currentProfile.avatarSrc}
        />

        <div className="space-y-6">
          <ProfileSection title="Profile Info">
            <ProfileItem
              icon={Mail}
              label="Email"
              value={currentProfile.email}
            />
            <ProfileItem
              icon={Phone}
              label="Phone"
              value={currentProfile.phoneNumber}
            />
            <ProfileItem
              icon={MapPin}
              label="Location"
              value={currentProfile.location}
            />
            <ProfileItem icon={Cake} label="Age" value={currentProfile.age} />
            <ProfileItem
              icon={Calendar}
              label="Joined"
              value={new Date(currentProfile.createdAt).toLocaleDateString()}
            />
            <ProfileItem
              icon={Briefcase}
              label="Account Type"
              value={currentProfile.type}
            />
            <ProfileItem
              icon={Users}
              label="Event Capacity"
              value={currentProfile.capacity.toString()}
            />
          </ProfileSection>

          <ProfileSection title="About Me">
            <p className="text-gray-600">{currentProfile.bio}</p>
          </ProfileSection>

          <ProfileSection title="Interests">
            <div className="flex flex-wrap gap-2">
              {currentProfile.interests.length === 0 ? (
                <span className="text-gray-600">No interests provided</span>
              ) : (
                currentProfile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 rounded px-2 py-1"
                  >
                    {interest}
                  </span>
                ))
              )}
            </div>
          </ProfileSection>

          <ProfileSection title="Social Media">
            <SocialMediaItem
              icon={<Globe />}
              label="Twitter"
              value={currentProfile.socialMedia.twitter}
            />
            <SocialMediaItem
              icon={<Book />}
              label="LinkedIn"
              value="LinkedIn Profile"
              link={currentProfile.socialMedia.linkedin}
            />
            <SocialMediaItem
              icon={<Music />}
              label="Instagram"
              value={currentProfile.socialMedia.instagram}
            />
          </ProfileSection>
        </div>

        <div className="text-center">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
