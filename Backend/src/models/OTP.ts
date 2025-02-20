import mongoose,{ Schema, model, Document } from "mongoose";

// interface for the otp
interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  expiryTime: Date;
}

export type OTPDocument = Document & IOTP;

const OTPSchema = new Schema<IOTP>({
  expiryTime: { type: Date, required: true },
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: "10m" } },
});


const OTP = mongoose.model<OTPDocument>("OTP", OTPSchema);

export default OTP;
