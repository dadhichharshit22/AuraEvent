import "react-toastify/dist/ReactToastify.css";
import ilus from '@/assets/illus.png'
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";


const ForgotPassword: React.FC= () => {

    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        try {
            await axios.post("http://localhost:8085/api/auth/send-otp", { email });
            setOtpSent(true);
            localStorage.setItem("email", email);
            toast.success("OTP sent to your email. Please check.");
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Error sending OTP. Please try again.");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            await axios.post("http://localhost:8085/api/auth/verify-otp", {
                email,
                otp,
            });
            setOtpVerified(true);
            toast.success("OTP verified successfully.");
            navigate("/change-password");
        } catch (error) {
            console.error("Error verifying OTP or registering:", error);
            toast.error("Error verifying OTP or registering. Please try again.");
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
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
                    <h1 className="font-extrabold text-4xl">Forgot Password</h1>
                    <form onSubmit={handleRegister} className="mx-auto space-y-6 w-full">
                        <div className="space-y-4 w-1/2 mx-auto">


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

                            <button
                                type="button"
                                onClick={handleSendOTP}
                                disabled={!email}
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
                                        Verify OTP
                                    </button>
                                    <p className="text-sm text-red-500 text-center">
                                        OTP will expire in 2 minutes
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
