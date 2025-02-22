import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Mail } from "lucide-react";
import ilus from "@/assets/illus.png";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPassword: React.FC = () => {
  const {
    email,
    setEmail,
    otp,
    setOtp,
    otpSent,
    handleSendOTP,
    handleVerifyOTP,
  } = useForgotPassword();

  return (
    <div className="flex gap-2 justify-between h-screen text-black">
      
      <div className="w-1/2 h-full">
        <img
          src={ilus}
          alt="Event Illustration"
          className="w-full h-full object-cover rounded-r-3xl"
        />
      </div>

      
      <div className="w-1/2 h-full flex flex-col justify-center items-center space-y-6">
        <h1 className="font-extrabold text-4xl">Forgot Password</h1>

        <div className="w-1/2 space-y-4">
        
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full py-2.5 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={!email}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {otpSent ? "Resend OTP" : "Send OTP"}
          </button>

        
          {otpSent && (
            <div className="space-y-4">
              <div className="relative">
                <label className="text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full py-2.5 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter 6-digit OTP"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleVerifyOTP}
                className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200"
              >
                Verify OTP
              </button>

              <p className="text-sm text-red-500 text-center">
                OTP will expire in 2 minutes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
