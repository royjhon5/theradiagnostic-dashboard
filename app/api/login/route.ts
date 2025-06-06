// import { mockUsers } from "@/app/login/users";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { username, password } = await req.json();

//   const user = mockUsers.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (!user) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

  // const response = NextResponse.json({ message: "Login successful" });
  // response.cookies.set(
  //   "user",
  //   JSON.stringify({ username: user.username, role: user.role }),
  //   {
  //     httpOnly: true,
  //     maxAge: 60 * 60 * 24,
  //     path: "/",
  //   }
  // );

//   return response;
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const res = await fetch("https://your-csharp-api.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set(
      "user",
      JSON.stringify({ username: data.user.username, role: data.user.role }),
      {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: "/",
      }
    );

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
