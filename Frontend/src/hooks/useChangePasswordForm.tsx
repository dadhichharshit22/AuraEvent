import { useState } from "react";

const useChangePasswordForm = (email: string) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const updateField = (field: "password" | "confirmPassword", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.password && formData.confirmPassword;

  return { formData, updateField, isFormValid };
};

export default useChangePasswordForm;
