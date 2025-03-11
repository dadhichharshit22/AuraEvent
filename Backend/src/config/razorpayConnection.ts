import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_SECRET;

const validateRazorpayConfig = (): void => {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.error("Error: Razorpay credentials are missing.");
    process.exit(1);
  }
};

validateRazorpayConfig();

export const createRazorpayInstance = (): Razorpay => {
  return new Razorpay({
    key_id: RAZORPAY_KEY_ID as string,
    key_secret: RAZORPAY_KEY_SECRET as string,
  });
};
