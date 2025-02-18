import mongoose, { Schema, Document } from 'mongoose';

// Define the IUser interface for type safety
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture?: string; // Optional field
  username: string;
  role: string;
  phoneNumber: string;  // Changed to string to avoid issues with leading zeros and long numbers
  createdAt: Date;
}

// Define the schema for the User model
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },  // Optional field
  username: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true }, // Changed to String
  role: { type: String, default: 'attendee' },
  createdAt: { type: Date, default: Date.now },
});

// Create the model from the schema
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
