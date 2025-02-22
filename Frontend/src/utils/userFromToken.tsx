import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  exp?: number;
  iat?: number;
  email?: string;
  roles?: string[];
}

export const getUserIdFromToken = (): string | null => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
      return null;
    }

    const decoded = jwtDecode<DecodedToken>(token);

    if (!decoded.userId) {
      console.error("Token does not contain userId");
      return null;
    }

    return decoded.userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem("token");
    return null;
  }
};
