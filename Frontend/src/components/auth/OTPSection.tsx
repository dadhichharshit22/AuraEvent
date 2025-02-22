import React from "react";

interface OTPSectionProps {
  otp: string;
  onOTPChange: (value: string) => void;
  onVerify: () => void;
}

export const OTPSection: React.FC<OTPSectionProps> = ({
  otp,
  onOTPChange,
  onVerify,
}) => (
  <div className="space-y-4">
    <div className="relative">
      <label className="text-sm font-medium text-gray-700 block mb-1">
        Enter OTP
      </label>
      <input
        type="text"
        value={otp}
        onChange={(e) => onOTPChange(e.target.value)}
        className="w-full py-2.5 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder="Enter 6-digit OTP"
        required
      />
    </div>
    <button
      type="button"
      onClick={onVerify}
      className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
    >
      Verify OTP & Register
    </button>
    <p className="text-sm text-red-500 text-center">
      OTP will expire in 5 minutes
    </p>
  </div>
);
