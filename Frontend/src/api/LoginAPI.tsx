import axios from "axios";
import { LoginCredentials, AuthResponse } from "../types/loginProps";

const BASE_URL = "http://localhost:8085/api/auth";

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  }
}
