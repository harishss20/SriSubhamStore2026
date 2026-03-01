import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ user: null });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ user: null });

  await connectToDatabase();
  const user = await User.findById(payload.userId).lean();
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      mobile: user.mobile,
      addresses: user.addresses.map(a => ({ _id: a._id, value: a.value })),
    },
  });
}
