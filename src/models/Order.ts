import { Schema, model, models, Document, Types } from "mongoose";
import { AddressSchema } from "./User";

const CartItemSchema = new Schema(
  {
    product: { type: Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number,
  },
  { _id: false }
);

export interface OrderDoc extends Document {
  user: Types.ObjectId;
  items: Array<{ product: Types.ObjectId; quantity: number; price: number }>;
  total: number;
  shippingAddress: any;
  contactPhone?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<OrderDoc>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
    total: Number,
    shippingAddress: AddressSchema,
    contactPhone: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Order = models.Order || model<OrderDoc>("Order", OrderSchema);
