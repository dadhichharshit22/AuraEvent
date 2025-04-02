import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import React from "react";
const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("userConsent");
    if (!consent) setShowBanner(true);
  }, []);

  const handleAccept = () => {
    Cookies.set("userConsent", "accepted", { expires: 30, path: "/" }); // Store cookie for 30 days
    setShowBanner(false);
  };

  const handleDecline = () => {
    Cookies.set("userConsent", "declined", { expires: 30, path: "/" });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <p>This website uses cookies to enhance your experience.</p>
      <div>
        <button onClick={handleAccept} className="bg-green-500 px-4 py-2 rounded">Accept</button>
        <button onClick={handleDecline} className="bg-red-500 px-4 py-2 rounded ml-2">Decline</button>
      </div>
    </div>
  );
};

export default CookieBanner;
