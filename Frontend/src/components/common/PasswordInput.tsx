import React from "react";
import { Lock } from "lucide-react";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
}) => (
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">
      {label}
    </label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder="••••••••"
        required
      />
    </div>
  </div>
);

export default PasswordInput;
