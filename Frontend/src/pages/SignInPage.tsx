import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { login } from "../store/slices/authSlice";
import { LoginCredentials } from "../types/authProps";
import { useLoginForm } from "../hooks/useLoginForm";
import { LoginForm } from "../components/auth/LoginForm";
import ilus from "@/assets/illus.png";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: isLoading } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (credentials: LoginCredentials) => {
    await dispatch(login(credentials));
  };

  const { values, handleChange, handleSubmit } = useLoginForm<LoginCredentials>({
    initialValues: { email: "", password: "" },
    onSubmit: handleLogin,
  });

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
