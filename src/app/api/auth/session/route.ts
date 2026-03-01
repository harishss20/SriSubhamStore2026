import { COOKIE_NAME, verifyToken } from "@/lib/auth";

import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectToDatabase } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const payload = await verifyToken(token);
    console.log("session token payload", payload);
    if (!payload) {
      return NextResponse.json({ user: null });
    }

    await connectToDatabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (await User.findById(payload.userId).lean()) as any; // cast due to mongoose typing
    if (!user) return NextResponse.json({ user: null });

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        addresses: user.addresses,
      },
    });
  } catch (err) {
    console.error("session route error", err);
    return NextResponse.json({ user: null, error: "Session check failed" }, { status: 500 });
  }
}
