import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    console.log("checkout token", token ? "present" : "missing");
    if (!token) return NextResponse.json({ success: false, error: "Unauthenticated" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) {
      console.log("checkout invalid token");
      return NextResponse.json({ success: false, error: "Unauthenticated" }, { status: 401 });
    }

    const body = await request.json();
    console.log("checkout body", body);
    const { items, total, shippingAddress, contactPhone } = body;
    if (!items || !total || !shippingAddress) {
      console.log("checkout invalid data", body);
      return NextResponse.json({ success: false, error: "Invalid order data" }, { status: 400 });
    }

    if (!process.env.MONGODB_URI) console.warn("checkout: no mongodb uri");
    await connectToDatabase();

    // shippingAddress stored as simple string in schema
    const addrValue = typeof shippingAddress === "string" ? shippingAddress : JSON.stringify(shippingAddress);
    const newOrder = await Order.create({
      user: payload.userId,
      items,
      total,
      shippingAddress: addrValue,
      contactPhone,
      status: "pending",
    });

    // here you could decrement inventory, send email, etc.

    return NextResponse.json({ success: true, orderId: newOrder._id });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json({ success: false, error: "Checkout failed" }, { status: 500 });
  }
}
