import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Lock } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import ilus from '@/assets/illus.png'

interface ChangePasswordProps {
    email: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ email }) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        try {
            console.log("email, password, confimPassword", email, password, confirmPassword);
            await axios.post("http://localhost:8085/api/auth/change-password", { password, confirmPassword, email });
            // setOtpSent(true);
            toast.success("Password changed successfully.");
            navigate("/login");
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Error changing. Please try again.");
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
                    <h1 className="font-extrabold text-4xl">Change Password</h1>
                    <form
                        onSubmit={handleRegister}
                        className="mx-auto space-y-6 w-full">
                        <div className="space-y-4 w-1/2 mx-auto">
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

                            <div className="relative">
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-10 w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleChangePassword}
                                disabled={!password || !confirmPassword}
                                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Change Password
                            </button>


                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
