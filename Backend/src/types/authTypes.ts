

export interface RegistrationData {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    username: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface PasswordChangeRequest {
    email: string;
    newPassword: string;
    confirmPassword: string;
  }
  