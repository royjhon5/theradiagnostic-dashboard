"use client";

import { Editor } from "@/components/blocks/editor-00/editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProcessData() {
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
        <div className="w-full justify-end flex items-center">
          <h1 className="text-xs font-bold italic mb-1">
            Transaction ID : 0001-256-6{" "}
          </h1>
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

        <div className="bg-background border-l rounded-lg mt-4">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            Payment Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-4">
            <div className="col-span-1">
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="email">Payment Amount</Label>
                <Input type="text" value={currentRow.amount_in_php} disabled />
              </div>
              <h2 className="text-xs font-bold mt-4">Payment Method:</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 mt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms2" />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cash
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms2" />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Credit Card
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms2" />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Insurance
                  </label>
                </div>
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
              Process Payment
            </Button>
            <Button className="bg-[#A3A3A3] hover:bg-[#A3A3A3] cursor-pointer">
              Print Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
