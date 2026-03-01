import { Schema, model, models, Document, Types } from "mongoose";

export // previously an object schema, now we simply store addresses as strings
const AddressSchema = new Schema({
  value: String,
}, { timestamps: true });

export interface Address {
  _id?: Types.ObjectId;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDoc extends Document {
  email: string;
  passwordHash: string;
  name?: string;
  mobile?: string;
  addresses: Types.DocumentArray<"Address">;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: String,
    mobile: String,
    addresses: [AddressSchema], // each document contains { value: string }
  },
  { timestamps: true }
);

export const User = models.User || model<UserDoc>("User", UserSchema);
