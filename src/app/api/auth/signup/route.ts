import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { readFile, writeFile } from "fs/promises";
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

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    users.push({ email: email.toLowerCase(), passwordHash });
    await writeFile(USERS_PATH, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, message: "Account created" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Signup failed" },
      { status: 500 }
    );
  }
}
