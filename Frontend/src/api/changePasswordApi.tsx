import axios from "axios";

const API_URL = "http://localhost:8085/api/auth";

class AuthService {
  static async changePassword(email: string, password: string, confirmPassword: string) {
    return axios.post(`${API_URL}/change-password`, { email, password, confirmPassword });
  }
}

export default AuthService;
