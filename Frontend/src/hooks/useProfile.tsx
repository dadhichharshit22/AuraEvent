import { useState, useEffect } from "react";
import { fetchProfileData } from "../apiServices/ProfileAPI";
import { ProfileData } from "@/types/ProfileData";
export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      setIsLoading(false);
      return;
    }

    fetchProfileData(token)
      .then((data) => {
        setProfile(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return { profile, isLoading, error };
};