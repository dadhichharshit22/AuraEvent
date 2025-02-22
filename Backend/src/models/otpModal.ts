import { Schema, model } from "mongoose";

const OTPSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: "10m" } },
});

export default model("OTP", OTPSchema);
