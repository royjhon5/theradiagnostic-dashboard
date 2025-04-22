"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import darklight from "../../public/logo/logo.png";

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-background p-8 flex flex-col justify-center flex-1">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8 flex justify-center md:hidden">
            <Image
              alt="rjdev logo"
              height={120}
              width={120}
              src={darklight}
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Sign in</h1>
          <div className="flex items-center justify-center mb-6">
            <div className="text-gray-500">OR</div>
          </div>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="keep-signed-in"
                  className="border-gray-500 data-[state=checked]:bg-blue-500"
                />
                <label
                  htmlFor="keep-signed-in"
                  className="text-sm cursor-pointer"
                >
                  Keep me signed in
                </label>
              </div>
              <Link href="#" className="text-sm text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button className="w-full" onClick={handleLogin}>
              Sign in
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            <span>Don&apos;t have an account?</span>{" "}
            <Link href="#" className="text-blue-400 hover:underline">
              Sign up
            </Link>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>

      <div className="hidden md:flex relative flex-1 bg-gradient-to-b from-blue-500 to-blue-900 p-8 flex-col justify-center items-start">
        <div className="max-w-md mx-auto md:mx-0 md:ml-16 lg:ml-24 z-10">
          <div className="absolute inset-0 flex flex-col gap-10 items-center justify-center text-white backdrop-blur-xs bg-[rgba(3,172,240,0.2)] font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
            <Image
              alt="rjdev logo"
              height={100}
              width={100}
              src={darklight}
              priority
            />
            <p className="dark:text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20">
              TheraDiagnostics
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full text-blue-800 opacity-20"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 300 Q 400 150 800 300 Q 1200 450 1600 300 L 1600 0 L 0 0 L 0 300"
              fill="currentColor"
            />
          </svg>
          <svg
            className="absolute bottom-0 w-full h-full text-blue-700 opacity-20"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 300 Q 600 0 1200 300 L 1200 0 L 0 0 L 0 300"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
