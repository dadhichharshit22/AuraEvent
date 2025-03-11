import { toast } from "react-toastify";
import rzpLogo from "../assets/react.svg";
import axios from "axios";

const RAZORPAY_KEY = "rzp_test_Y5saFssULUDwHJ";

function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export async function payEventFee(
  token: string,
  eventId: string,
  userId: string,
  userDetails: UserDetails
): Promise<void> {
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    const orderResponse = await axios.post(
      "http://localhost:8085/api/pay/capturePayment",
      { eventId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    const options = {
      key: RAZORPAY_KEY,
      currency: orderResponse.data.message.currency,
      amount: `${orderResponse.data.message.amount}`,
      order_id: orderResponse.data.message.id,
      name: "Aura Event",
      description: "Thank You for Registering for the Event",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      config: {
        display: {
          blocks: {
            utib: {
              name: "Pay using Axis Bank",
              instruments: [
                { method: "card", issuers: ["UTIB"] },
                { method: "netbanking", banks: ["UTIB"] },
              ],
            },
            other: {
              name: "Other Payment modes",
              instruments: [
                { method: "card", issuers: ["ICIC"] },
                { method: "netbanking" },
                { method: "upi" },
              ],
            },
          },
          sequence: ["block.utib", "block.other"],
          preferences: { show_default_blocks: true },
        },
      },
      handler: (response: RazorpayResponse) => {
        verifyPayment({ ...response, eventId, userId }, token);
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", () => {
      toast.error("Oops, Payment Failed");
    });
  } catch (error) {
    toast.error("Could not make Payment");
  } finally {
    toast.dismiss(toastId);
  }
}

async function verifyPayment(
  bodyData: RazorpayResponse & { eventId: string; userId: string },
  token: string
): Promise<void> {
  const toastId = toast.loading("Verifying Payment...");
  try {
    const response = await axios.post(
      "http://localhost:8085/api/pay/verifyPayment",
      bodyData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful, you are added to the course");
  } catch (error) {
    toast.error("Could not verify Payment");
  } finally {
    toast.dismiss(toastId);
  }
}
