import axios from "axios";
import { toast } from "react-toastify";
import { getUserIdFromToken } from "../utils/userFromToken";
import { payEventFee } from "../utils/payment";

const useRegisterEvent = (
  id: string,
  event: Event | null,
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleRegister = async () => {
    const userId = getUserIdFromToken();
    const token = localStorage.getItem("token");

    try {
      if (event?.type === "Paid") {
        await payEventFee(token, event._id, userId, {
          firstName: "Dadhich",
          lastName: "Shaabh",
          email: "abc@gmail.com",
        });
      } else {
        await axios.post(
          `http://localhost:8085/api/events/${id}/register`,
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setIsRegistered(true);
      toast.success("Successfully registered!");
    } catch (error) {
      toast.error("Registration failed");
      console.error("Error during registration:", error);
    }
  };

  const handleUnregister = async () => {
    const userId = getUserIdFromToken();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:8085/api/events/${id}/unregister`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsRegistered(false);
      toast.success("Successfully unregistered from the event");
    } catch (error) {
      toast.error("Failed to unregister");
      console.error("Error during unregistration:", error);
    }
  };

  return { handleRegister, handleUnregister };
};

export default useRegisterEvent;
