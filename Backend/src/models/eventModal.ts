import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";

interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  image: string;
  organizer: mongoose.Types.ObjectId;
  type: string;
  capacity: Number;
  price: number;
  attendees: mongoose.Types.ObjectId[];
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, default: 0 },
  location: { type: String, required: true },
  category: { type: String, required: true },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export { IEvent };
export const Event = mongoose.model<IEvent>("Event", eventSchema);
