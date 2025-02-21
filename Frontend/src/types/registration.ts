export interface RegisterFormData {
    name: string;
    email: string;
    username: string;
    phoneNumber: string;
    password: string;
  }
  
  export interface OTPData {
    email: string;
    otp: string;
  }
  
  export interface AuthResponse {
    token: string;
    message: string;
  }