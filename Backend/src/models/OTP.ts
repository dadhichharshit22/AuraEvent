import { Schema, model, Document } from "mongoose";

// Define interface to enforce typing for OTP schema
interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

// Define the schema with explicit types and structure
const OTPSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: "10m" } },
});

// Create and export the OTP model
const OTP = model<IOTP>("OTP", OTPSchema);

export default OTP;
