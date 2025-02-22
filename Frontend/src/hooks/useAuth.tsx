import { useState, useEffect } from "react";
import { AuthState } from "../types/authProps";

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    isRegistered: false,
    token: null,
    email: localStorage.getItem("email"),
  });

  const setIsRegistered = (value: boolean) => {
    setAuth((prev) => ({ ...prev, isRegistered: value }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth((prev) => ({ ...prev, isRegistered: true, token }));
    }
  }, []);

  const handleRegister = (token: string) => {
    localStorage.setItem("token", token);
    setAuth((prev) => ({ ...prev, isRegistered: true, token }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth((prev) => ({ ...prev, isRegistered: false, token: null }));
  };

  return {
    auth,
    setIsRegistered,
    handleRegister,
    handleLogout,
  };
};
