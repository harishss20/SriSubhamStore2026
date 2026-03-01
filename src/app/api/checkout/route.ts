import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ success: false, error: "Unauthenticated" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ success: false, error: "Unauthenticated" }, { status: 401 });

    const { items, total, shippingAddress, contactPhone } = await request.json();
    if (!items || !total || !shippingAddress) {
      return NextResponse.json({ success: false, error: "Invalid order data" }, { status: 400 });
    }

    await connectToDatabase();

    const addrValue = typeof shippingAddress === "string" ? { value: shippingAddress } : shippingAddress;
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
    console.error(err);
    return NextResponse.json({ success: false, error: "Checkout failed" }, { status: 500 });
  }
}
