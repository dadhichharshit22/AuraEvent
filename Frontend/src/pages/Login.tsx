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
    // <div className="w-full h-full flex gap-12 flex-col justify-center items-center">
    //   <div className="w-full max-w-md space-y-8 bg-white shadow-xl rounded-2xl p-8">
    //     <div className="text-center">
    //       <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
    //         Welcome Back
    //       </h1>
    //       <p className="mt-2 text-gray-600">Sign in to your account</p>
    //     </div>

    //     <form onSubmit={handleLogin} className="mt-8 space-y-6">
    //       <div className="space-y-4">
    //         <div className="relative">
    //           <label className="text-sm font-medium text-gray-700 block mb-1">
    //             Email
    //           </label>
    //           <div className="relative">
    //             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    //             <input
    //               type="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="pl-10 w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    //               placeholder="you@example.com"
    //               required
    //             />
    //           </div>
    //         </div>

    //         <div className="relative">
    //           <label className="text-sm font-medium text-gray-700 block mb-1">
    //             Password
    //           </label>
    //           <div className="relative">
    //             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    //             <input
    //               type="password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               className="pl-10 w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    //               placeholder="••••••••"
    //               required
    //             />
    //           </div>
    //         </div>

    //         <div className="flex items-center justify-between">
    //           <div className="flex items-center">
    //             <input
    //               id="remember-me"
    //               name="remember-me"
    //               type="checkbox"
    //               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    //             />
    //             <label
    //               htmlFor="remember-me"
    //               className="ml-2 block text-sm text-gray-700"
    //             >
    //               Remember me
    //             </label>
    //           </div>

    //           <a
    //             href="/forgot-password"
    //             className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
    //           >
    //             Forgot password?
    //           </a>
    //         </div>

    //         <button
    //           type="submit"
    //           className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    //         >
    //           Sign in
    //         </button>
    //       </div>
    //     </form>

    //     <div className="mt-8 text-center">
    //       <p className="text-gray-600">
    //         Don't have an account?{" "}
    //         <a
    //           href="/register"
    //           className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
    //         >
    //           Sign up
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
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


