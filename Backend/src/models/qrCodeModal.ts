import mongoose from "mongoose";

const QrCodeSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event" },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  qrCodeUrl: { type: String, required: true },
});

export default mongoose.model("QrCode", QrCodeSchema);
