import Razorpay from "razorpay";

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY || "rzp_test_Y5saFssULUDwHJ",
    key_secret: process.env.RAZORPAY_SECRET || "Us8TZetGL8RvWlkHE08nS5Ud",
});
