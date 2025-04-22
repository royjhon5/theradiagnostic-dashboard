import { mockUsers } from "@/app/login/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set(
    "user",
    JSON.stringify({ username: user.username, role: user.role }),
    {
      httpOnly: false,
      maxAge: 60 * 60 * 24,
      path: "/",
    }
  );

  return response;
}
