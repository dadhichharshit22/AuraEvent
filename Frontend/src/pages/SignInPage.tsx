import React from "react";
import { LoginCredentials } from "../types/loginProps";
import { useLogin } from "../hooks/useLogin";
import { useLoginForm } from "../hooks/useLoginForm";
import { LoginForm } from "../components/auth/LoginForm";
import ilus from "@/assets/illus.png";

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { login, isLoading } = useLogin(onLogin);
  const { values, handleChange, handleSubmit } = useLoginForm<LoginCredentials>(
    {
      initialValues: { email: "", password: "" },
      onSubmit: login,
    }
  );

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
          <LoginForm
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
