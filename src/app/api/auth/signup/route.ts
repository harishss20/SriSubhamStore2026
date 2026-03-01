import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const { email, password, name, mobile, address } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password required" }, { status: 400 });
    }

    // simple validation; you can replace with zod/joi
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }

    if (mobile && !/^\+?[1-9]\d{1,14}$/.test(mobile)) {
      return NextResponse.json({ success: false, error: "Invalid mobile number" }, { status: 400 });
    }

    await connectToDatabase();
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const userData: any = {
      email: email.toLowerCase(),
      passwordHash,
    };
    if (name) userData.name = name;
    if (mobile) userData.mobile = mobile;
    if (address) {
      // address may come as string or object; stringify to store
      userData.addresses = [{ value: typeof address === "string" ? address : JSON.stringify(address) }];
    }

    await User.create(userData);
    return NextResponse.json({ success: true, message: "Account created" });
  } catch (err: any) {
    console.error("signup error", err);
    const message =
      process.env.NODE_ENV === "production"
        ? "Signup failed"
        : err?.message || "Signup failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
