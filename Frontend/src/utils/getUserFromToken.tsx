import { jwtDecode } from 'jwt-decode'; 


interface DecodedToken {
  userId: string;
  exp?: number;
  iat?: number;
  email?: string;
  roles?: string[];

}

/*
 * Retrieves and decodes the user ID from a JWT token stored in localStorage
 * @returns The user ID if token exists and is valid, null otherwise
 */
export const getUserIdFromToken = (): string | null => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage');
      return null;
    }

    // Decode token
    const decoded = jwtDecode<DecodedToken>(token);

  
    // if (decoded.exp && decoded.exp < Date.now() / 1000) {
    //   console.warn('Token has expired');
    //   localStorage.removeItem('token');
    //   return null;
    // }

    // Validate userId exists
    if (!decoded.userId) {
      console.error('Token does not contain userId');
      return null;
    }

    return decoded.userId;

  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('token');
    return null;
  }
};

// /**
//  * Checks if the current token is valid and not expired
//  * @returns boolean indicating if token is valid
//  */
// export const isValidToken = (): boolean => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) return false;

//     const decoded = jwtDecode<DecodedToken>(token);
//     return decoded.exp ? decoded.exp > Date.now() / 1000 : true;
//   } catch {
//     return false;
//   }
// };