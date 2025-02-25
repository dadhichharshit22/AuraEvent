import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../api/ChangePasswordAPI";
import useChangePasswordForm from "@/hooks/useChangePasswordForm";
import PasswordInput from "@/components/common/PasswordInput";
import ilus from "@/assets/illus.png";

interface ChangePasswordProps {
  email: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ email }) => {
  const { formData, updateField, isFormValid } = useChangePasswordForm(email);
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      await AuthService.changePassword(
        email,
        formData.password,
        formData.confirmPassword
      );
      toast.success("Password changed successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Error changing password. Please try again.");
    }
  };

  return (
    <div className="flex gap-2 justify-between h-screen text-black">
      
      <div className="w-1/2 h-full overflow-hidden">
        <img
          src={ilus}
          alt="Illustration"
          className="object-cover w-full h-full rounded-r-3xl"
        />
      </div>

    
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-4xl mb-6">Change Password</h1>
        <form className="space-y-6 w-1/2">
          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={(value) => updateField("password", value)}
          />
          <PasswordInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(value) => updateField("confirmPassword", value)}
          />
          <button
            type="button"
            onClick={handleChangePassword}
            disabled={!isFormValid}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
