import React from "react";
import { useProfile } from "@/hooks/useProfile";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileItem from "@/components/ProfileItem";
import ProfileSection from "@/components/ProfileSection";
import SocialMediaItem from "@/components/SocailMediaProfile";
import { Mail,Phone,MapPin,Cake,Calendar,Briefcase,Users,Music,Globe,Book } from "lucide-react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile: React.FC = () => {
  const { profile, error } = useProfile();

  

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-xl text-purple-600">{error || "Failed to load profile"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader
          name={profile.name}
          username={profile.username}
          role={profile.role}
          avatarSrc="/placeholder-avatar.jpg"
        />

        <div className="space-y-6">
          <ProfileSection title="Profile Info">
            <ProfileItem icon={Mail} label="Email" value={profile.email} />
            <ProfileItem icon={Phone} label="Phone" value={profile.phoneNumber} />
            <ProfileItem icon={MapPin} label="Location" value={profile.location} />
            <ProfileItem icon={Cake} label="Age" value={`${profile.age} years old`} />
            <ProfileItem icon={Calendar} label="Joined" value={new Date(profile.createdAt).toLocaleDateString()} />
            <ProfileItem icon={Briefcase} label="Account Type" value={profile.type} />
            <ProfileItem icon={Users} label="Event Capacity" value={profile.capacity.toString()} />
          </ProfileSection>

          <ProfileSection title="About Me">
            <p className="text-gray-600">{profile.bio}</p>
          </ProfileSection>

          <ProfileSection title="Interests">
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 rounded px-2 py-1">
                  {interest}
                </span>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection title="Social Media">
            <SocialMediaItem icon={<Globe />} label="Twitter" value={profile.socialMedia.twitter} />
            <SocialMediaItem icon={<Book />} label="LinkedIn" value="LinkedIn Profile" link={profile.socialMedia.linkedin} />
            <SocialMediaItem icon={<Music />} label="Instagram" value={profile.socialMedia.instagram} />
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