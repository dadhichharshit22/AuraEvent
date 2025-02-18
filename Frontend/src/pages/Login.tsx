import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import ilus from '@/assets/illus.png'

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8085/api/auth/login",
        {
          email,
          password,
        }
      );
      onLogin(response.data.token);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex gap-2 justify-between h-screen text-black">
      <div className="w-1/2 h-full overflow-hidden">
        <img
          src={ilus}
          alt="Event Illustration"
          className="object-cover w-full h-full rounded-r-3xl"
        />
      </div>

      <div className="w-1/2 h-full overflow-hidden">
        <div className="w-full h-full flex gap-12 flex-col justify-center items-center">
          <h1 className="font-extrabold text-4xl">Login</h1>
          <form
            onSubmit={handleLogin}
            className="flex gap-4 flex-col justify-center items-center w-full"
          >
            <div className="flex flex-col w-full  items-center">
              <label htmlFor="email" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-xl px-4 py-2 w-1/2"
              />
            </div>

            <div className="flex flex-col w-full  items-center">
              <label htmlFor="password" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-xl px-4 py-2 w-1/2"
              />
            </div>

            {/* {error && <p className="color-red">{error}</p>} */}
            <a
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Forgot password?
            </a>
            <Button
              variant={"default"}
              className="border hover:border-black m-6 p-6"
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


