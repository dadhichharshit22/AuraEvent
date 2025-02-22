import React from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "../common/InputFieldLogin";
import { LoginCredentials } from "../../types/loginProps";

interface LoginFormProps {
  values: LoginCredentials;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  values,
  onChange,
  onSubmit,
  isLoading,
}) => (
  <form
    onSubmit={onSubmit}
    className="flex gap-4 flex-col justify-center items-center w-full"
  >
    <InputField
      id="email"
      name="email"
      type="email"
      placeholder="Enter your Email"
      value={values.email}
      onChange={onChange}
    />

    <InputField
      id="password"
      name="password"
      type="password"
      placeholder="Enter your Password"
      value={values.password}
      onChange={onChange}
    />

    <a
      href="/forgot-password"
      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
    >
      Forgot password?
    </a>

    <Button
      variant="default"
      className="border hover:border-black m-6 p-6"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? "Logging in..." : "Login"}
    </Button>
  </form>
);
