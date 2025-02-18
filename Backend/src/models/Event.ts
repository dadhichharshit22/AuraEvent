import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  image?: string; // Optional field
  organizer: Schema.Types.ObjectId; // Referencing User model
  type: string;
  capacity: number;
  price: number;
  attendees: Schema.Types.ObjectId[]; // Array of User ObjectId references
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String }, // Optional image field
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, default: 0 },
  location: { type: String, required: true },
  category: { type: String, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure it references the 'User' model
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Array of ObjectId references to the 'User' model
});

const Event = model<IEvent>('Event', eventSchema);

export default Event;
