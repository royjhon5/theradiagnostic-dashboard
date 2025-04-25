"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, LockIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UnauthorizedPage() {
  const [user, setUser] = useState({
    username: "Unknown User",
    role: "admin",
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user from cookie:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <LockIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Unauthorized Access
        </h1>
        <p className="mt-4 text-muted-foreground">
          You do not have the necessary permissions to access this resource.
          Please contact your administrator for assistance.
        </p>
        <div className="mt-6">
          {user.role === "admin" ? (
            <Link href="/dashboard">
              <Button size="lg" className="cursor-pointer">
                <ArrowLeft />
                Go to homepage
              </Button>
            </Link>
          ) : user.role === "staff" ? (
            <Link href="/appointment">
              <Button size="lg" className="cursor-pointer">
                <ArrowLeft />
                Go to homepage
              </Button>
            </Link>
          ) : user.role === "doctor" ? (
            <Link href="/dashboard">
              <Button size="lg" className="cursor-pointer">
                <ArrowLeft />
                Go to homepage
              </Button>
            </Link>
          ) : (
            <Link href="/transactions">
              <Button size="lg" className="cursor-pointer">
                <ArrowLeft />
                Go to homepage
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
