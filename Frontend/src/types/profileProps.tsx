export interface ProfileData {
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
  avatarSrc?: string;
}
