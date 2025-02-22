import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const RAZORPAY_KEY = process.env.RAZORPAY_KEY;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

if (!RAZORPAY_KEY || !RAZORPAY_SECRET) {
  console.error("Razorpay credentials are missing.");
  process.exit(1);
}

export const instance = new Razorpay({
  key_id: RAZORPAY_KEY,
  key_secret: RAZORPAY_SECRET,
});
