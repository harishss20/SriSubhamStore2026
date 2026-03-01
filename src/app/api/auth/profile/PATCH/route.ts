import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ success: false, error: "Unauthenticated" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ success: false, error: "Unauthenticated" }, { status: 401 });

    const body = await request.json();
    const { name, mobile, address, addressId, removeAddress } = body;

    await connectToDatabase();
    const user = await User.findById(payload.userId);
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    if (name !== undefined) user.name = name;
    if (mobile !== undefined) user.mobile = mobile;

    // address management: store string value
    if (address) {
      const value = typeof address === "string" ? address : JSON.stringify(address);
      if (addressId) {
        const addr = user.addresses.id(addressId);
        if (addr) {
          addr.value = value;
        }
      } else {
        user.addresses.push({ value });
      }
    }
    if (removeAddress && addressId) {
      user.addresses.id(addressId)?.remove();
    }

    await user.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}
