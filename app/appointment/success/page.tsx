"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import QRCode from "react-qr-code";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const prioNo = searchParams.get("priorityNo");
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center justify-center items-center">
        <h2 className="text-3xl font-bold text-green-500 tracking-tight text-foreground sm:text-2xl">
          Client Registration Success
        </h2>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Priority # {prioNo}
        </h2>
        <div className="flex justify-center items-center">
          <QRCode value={prioNo || ""} />
        </div>
        <p className="mt-4 text-muted-foreground"></p>
        <div className="mt-6">
          <Link href="/appointment/client-registration">
            <Button size="lg" className="cursor-pointer">
              Create New Client
            </Button>
          </Link>
          <Link href="/appointment/client-registration">
            <Button size="lg" className="cursor-pointer ml-4">
              Print Receipt
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
