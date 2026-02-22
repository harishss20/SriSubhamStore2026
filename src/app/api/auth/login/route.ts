import { NextResponse } from "next/server";
import { verifyPassword, createToken, COOKIE_NAME } from "@/lib/auth";
import { readFile } from "fs/promises";
import path from "path";

const USERS_PATH = path.join(process.cwd(), "src", "data", "users.json");

interface UserRecord {
  email: string;
  passwordHash: string;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password required" },
        { status: 400 }
      );
    }

    const users: UserRecord[] = JSON.parse(
      await readFile(USERS_PATH, "utf-8").catch(() => "[]")
    );

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await createToken(user.email);
    const res = NextResponse.json({ success: true, email: user.email });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
