import React from "react";
import { Mail, Lock, User, UserCircle, Phone } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import ilus from "@/assets/illus.png";
import { FormInput } from "../components/common/FormInput";
import { OTPSection } from "../components/auth/OTPSection";
import { useRegistration } from "../hooks/useRegistration";

interface RegisterPageProps {
  onRegister: (token: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const {
    formData,
    otp,
    otpSent,
    setOtp,
    handleInputChange,
    handleSendOTP,
    handleVerifyOTP,
  } = useRegistration(onRegister);

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

        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-6">
          <div className="space-y-4">
            <FormInput
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="John Doe"
              icon={UserCircle}
            />

            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              placeholder="you@example.com"
              icon={Mail}
            />

            <FormInput
              label="Username"
              type="text"
              value={formData.username}
              onChange={handleInputChange("username")}
              placeholder="username"
              icon={User}
            />

            <FormInput
              label="Phone Number"
              type="number"
              value={formData.phoneNumber}
              onChange={handleInputChange("phoneNumber")}
              placeholder="Phone Number"
              icon={Phone}
            />

            <FormInput
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              placeholder="••••••••"
              icon={Lock}
            />

            <button
              type="button"
              onClick={handleSendOTP}
              disabled={!formData.username || !formData.password}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {otpSent ? "Resend OTP" : "Send OTP"}
            </button>

            {otpSent && (
              <OTPSection
                otp={otp}
                onOTPChange={setOtp}
                onVerify={handleVerifyOTP}
              />
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

export default RegisterPage;
