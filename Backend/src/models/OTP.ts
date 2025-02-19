import { Schema, model, Document } from "mongoose";

// interface for the otp
interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}


const OTPSchema = new Schema<IOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: "10m" } },
});


const OTP = model<IOTP>("OTP", OTPSchema);

export default OTP;
