import React from "react";

export const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-pulse text-xl text-gray-600">
      Loading your registered events...
    </div>
  </div>
);
