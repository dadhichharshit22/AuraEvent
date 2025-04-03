import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: string;
  exp?: number;
  iat?: number;
  email?: string;
  roles?: string[];
}

/**
 * Retrieves the stored authentication token from localStorage.
 * Returns `null` if no token is found.
 */
const getStoredAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

/**
 * Decodes the JWT and extracts the user ID.
 * If the token is invalid, it removes it from localStorage to prevent future issues.
 */
export const extractUserIdFromJwt = (): string | null => {
  try {
    const storedToken = getStoredAuthToken();

    if (!storedToken) {
      console.warn(
        "Authentication token is missing. User is not logged in."
      );
      return null;
    }

    const decodedPayload = jwtDecode<JwtPayload>(storedToken);

    if (!decodedPayload.userId) {
      console.error(
        "Decoded JWT is missing userId. Possible malformed token."
      );
      return null;
    }

    return decodedPayload.userId;
  } catch (error) {
    console.error(
      "Invalid or expired JWT detected. Removing token.", 
      error
    );
    
    localStorage.removeItem("token");
    return null;
  }
};


