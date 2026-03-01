import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";

// Next.js provides `params` as a promise in newer versions, so use a loose type
export async function GET(
  request: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  const { params } = context as { params: { id: string } }; // params.id should exist
  try {
    await connectToDatabase();
    const order = await Order.findById(params.id).lean();
    if (!order) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed" }, { status: 500 });
  }
}
