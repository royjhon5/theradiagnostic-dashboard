"use client";

import { Editor } from "@/components/blocks/editor-00/editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TransactionData() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.get("data");
  let currentRow: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (raw) {
    try {
      const decoded = decodeURIComponent(raw);
      currentRow = JSON.parse(decoded);
      console.log("test", currentRow);
    } catch (error) {
      console.error("Error parsing row data:", error);
    }
  }
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 flex flex-col gap-3 mt-4">
      <div className="col-span-2">
        <div className="w-full justify-between flex items-center">
          <div>
            <h3 className="text-xs font-bold italic mb-2">
              Status:{" "}
              <Badge
                className={
                  currentRow.status === "pending"
                    ? "bg-primary"
                    : currentRow.status === "completed"
                      ? "bg-green-500"
                      : "bg-red-500"
                }
              >
                {currentRow.status}
              </Badge>
            </h3>
          </div>
          <h3 className="text-xs font-bold italic mb-1">
            Transaction ID : 0001-256-6{" "}
          </h3>
        </div>

        <div className="bg-background p-2 border-l rounded-lg border-primary shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            {/* Avatar */}
            <div className="flex flex-row gap-2 items-center">
              <Avatar className="w-15 h-15">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <p style={{ fontSize: 10 }}>Performed by:</p>
                <p className="text-md font-bold">Nate Diaz</p>
                <p className="text-sm">Staff ID: 006-2548-63</p>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col justify-end md:text-right">
              <p className="text-md font-bold">{formattedDate}</p>
              <p style={{ fontSize: 10 }}>Date of Addition</p>
            </div>
          </div>
        </div>

        <div className="bg-background border-l rounded-lg mt-4">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            Client Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-4">
            <div className="grid w-full max-w-sm items-center gap-1">
              <Label htmlFor="email">Client Full Name</Label>
              <Input type="text" value={currentRow.client_name} disabled />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1">
              <Label htmlFor="email">Client ID</Label>
              <Input type="text" value={currentRow.client_id} disabled />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1">
              <Label htmlFor="email">Contact No.</Label>
              <Input type="text" disabled />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background border-l rounded-lg mt-4">
            <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
              Payment Details
            </h2>
            <div className="p-4 flex flex-col gap-4">
              <p>Amount: P {currentRow.amount_in_php}</p>
              <p>Payment Method: Cash</p>
              <p>
                Transaction Status:{" "}
                <Badge
                  className={
                    currentRow.status === "pending"
                      ? "bg-primary"
                      : currentRow.status === "completed"
                        ? "bg-green-500"
                        : "bg-red-500"
                  }
                >
                  {currentRow.status}
                </Badge>
              </p>
            </div>
          </div>

          <div className="bg-background border-l rounded-lg mt-4">
            <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
              Transaction Description
            </h2>
            <div className="p-4">
              <div className="space-y-2">
                <p className="font-medium">
                  A payment for laboratory testing services including:
                </p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>CBC</li>
                  <li>Lipid Panel.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background border-l rounded-lg mt-4">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            Aditional Notes
          </h2>
          <div>
            <Editor />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between mt-4 gap-2">
          <div>
            <Button
              variant="destructive"
              className="w-full md:w-full cursor-pointer"
              onClick={() => {
                router.push("/transactions");
              }}
            >
              <ArrowLeft />
              Back To Transactions
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button className="bg-[#66C87B] hover:bg-[#66C87B] cursor-pointer">
              Download Receipt
            </Button>
            <Button className="bg-[#A3A3A3] hover:bg-[#A3A3A3] cursor-pointer">
              Generate Invoice
            </Button>
            <Button className="bg-[#A3A3A3] hover:bg-[#A3A3A3] cursor-pointer">
              Issue Refund
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
