import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, User, UserCircle } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
//import { Button } from "@/components/ui/button";
import ilus from "@/assets/illus.png";

interface RegisterProps {
  onRegister: (token: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [phoneNumber,setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      await axios.post("http://localhost:8085/api/otp/send-otp", { email });
      setOtpSent(true);
      toast.success("OTP sent to your email. Please check.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await axios.post("http://localhost:8085/api/otp/verify-otp", {
        email,
        otp,
      });
      setOtpVerified(true);
      toast.success("OTP verified successfully.");

      const response = await axios.post(
        "http://localhost:8085/api/auth/register",
        {
          name,
          email,
          phoneNumber,
          password,
          username,
        }
      );
      onRegister(response.data.token);
      toast.success("Registered successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error verifying OTP or registering:", error);
      toast.error("Error verifying OTP or registering. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center items-center px-4 py-8">
      <div className="w-1/2 h-full overflow-hidden">
        <img
          src={ilus}
          alt="Event Illustration"
          className="object-cover w-full h-full rounded-r-3xl"
        />
      </div>
      <div className="w-full max-w-md space-y-8 bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="mt-2 text-gray-600">Join us and start your journey</p>
        </div>

        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="username"
                  required
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                phoneNumber
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10 w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="phoneNumber"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendOTP}
              disabled={!username || !password}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {otpSent ? "Resend OTP" : "Send OTP"}
            </button>

            {otpSent && (
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter 6-digit OTP"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Verify OTP & Register
                </button>
                <p className="text-sm text-red-500 text-center">
                  OTP will expire in 5 minutes
                </p>
              </div>
            )}
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;