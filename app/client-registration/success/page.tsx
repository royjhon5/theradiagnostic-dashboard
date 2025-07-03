"use client";

import { generateMedicalReportPdf } from "@/app/api/services/client.api";
import useGetClientById from "@/app/client-list/hooks/useGetClientById";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");
  const { clientData } = useGetClientById(Number(clientId));
  const [qrCodeSrc, setQrCodeSrc] = useState<string | null>(null);

  const GenerateApe = async () => {
    try {
      await generateMedicalReportPdf(Number(clientId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!clientId) {
      router.replace("/client-registration");
    }
  }, [clientId, router]);

  useEffect(() => {
    if (clientData && clientData.length > 0 && clientData[0].qrCodeImage) {
      try {
        if (typeof clientData[0].qrCodeImage === "string") {
          setQrCodeSrc(`data:image/png;base64,${clientData[0].qrCodeImage}`);
        } else {
          const buffer = clientData[0].qrCodeImage;
          const bytes =
            buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
          const base64 = arrayBufferToBase64(bytes);
          setQrCodeSrc(`data:image/png;base64,${base64}`);
        }
      } catch (err) {
        console.error("QR code conversion error:", err);
      }
    }
  }, [clientData]);
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full text-center justify-center items-center">
        <h2 className="text-3xl font-bold text-green-500 tracking-tight text-foreground sm:text-5xl">
          Client Registration Success
        </h2>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
          Priority # {clientData[0]?.priorityNo}
        </h2>
        <div className="flex justify-center items-center">
          {qrCodeSrc ? (
            <Image
              src={qrCodeSrc}
              alt="Client QR Code"
              width={350}
              height={350}
            />
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </div>
        <p className="mt-4 text-muted-foreground"></p>
        <div className="mt-6">
          <Link href="/client-registration">
            <Button size="xl" className="cursor-pointer">
              CREATE NEW CLIENT
            </Button>
          </Link>
          <Button
            size="xl"
            className="cursor-pointer ml-4"
            onClick={GenerateApe}
          >
            GENERATE APE
          </Button>
        </div>
      </div>
    </div>
  );
}

function arrayBufferToBase64(buffer: Uint8Array): string {
  const binary = buffer.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    ""
  );
  return btoa(binary);
}
