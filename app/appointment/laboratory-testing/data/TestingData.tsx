"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Save, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Editor } from "@/components/blocks/editor-00/editor";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useGetClientById from "@/app/client-list/client/useGetClientById";
import { Stepper } from "@/components/ui/stepper";
interface TestItem {
  id: string;
  name: string;
  price: number;
  checked: boolean;
}
export default function TestingData() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("clientId");
  const router = useRouter();
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  const [tests] = useState<TestItem[]>([
    {
      id: "cbc",
      name: "Complete Blood Count (CBC)",
      price: 200.0,
      checked: false,
    },
    { id: "lipid", name: "Lipid Panel", price: 450.0, checked: false },
    { id: "thyroid", name: "Thyroid Panel", price: 150.0, checked: false },
    { id: "xray", name: "X-ray", price: 80.0, checked: false },
    { id: "mri", name: "MRI", price: 80.0, checked: false },
    { id: "ct", name: "CT Scan", price: 80.0, checked: false },
  ]);

  const permissionsData = [
    { id: "Complete Blood Count (CBC)", label: "Complete Blood Count (CBC)" },
    { id: "Lipid Panel", label: "Lipid Panel" },
    {
      id: "Thyroid Stimulating Hormone (TSH)",
      label: "Thyroid Stimulating Hormone (TSH)",
    },
    { id: "X-ray", label: "X-ray" },
    { id: "MRI", label: "MRI" },
    { id: "CT Scan", label: "CT Scan" },
    { id: "Blood Chemistry", label: "Blood Chemistry" },
    { id: "Liver Function Test", label: "Liver Function Test" },
    { id: "Urinalysis", label: "Urinalysis" },
    { id: "Ultrasound", label: "Ultrasound" },
  ];

  const [permissions] = useState(
    permissionsData.reduce(
      (acc, permission) => {
        acc[permission.id] = false;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );
  let currentId: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

  if (raw) {
    try {
      const decoded = decodeURIComponent(raw);
      currentId = JSON.parse(decoded);
      console.log("test", currentId);
    } catch (error) {
      console.error("Error parsing row data:", error);
    }
  }
  const { clientDetails } = useGetClientById(currentId);

  const steps = [
    { title: "Client Registration", description: "Step 1" },
    { title: "Laboratory Test", description: "Step 2" },
    { title: "Done", description: "Step 3" },
  ];

  const [currentStep, setCurrentStep] = useState(2);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 flex flex-col gap-3 mt-4">
      <div className="col-span-2">
        <div className="w-full justify-between flex items-center mb-4 bg-background shadow-sm p-4 rounded-lg border">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
        <div className="bg-background p-2 border-l rounded-lg border-primary shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            {/* Avatar */}
            <div className="flex flex-row gap-2 items-center">
              <Avatar className="w-15 h-15">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CNs</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <p style={{ fontSize: 10 }}>
                  Client name: {clientDetails?.firstName}{" "}
                  {clientDetails?.middleName} {clientDetails?.lastName}
                </p>
                <p className="text-md font-bold"></p>
                <p className="text-sm">Client ID: {currentId}</p>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col md:text-right">
              <p style={{ fontSize: 10 }}>Assess By: Nate Diaz</p>
              <p className="text-md font-bold">{formattedDate}</p>
              <p style={{ fontSize: 10 }}>Date of Assessment</p>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg mt-4 shadow-sm">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            Select Lab Test Packages
          </h2>
          <div className="p-2">
            {tests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`test-${test.id}-1`}
                    checked={test.checked}
                    className="border border-primary cursor-pointer"
                  />
                  <label
                    htmlFor={`test-${test.id}-1`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {test.name}
                  </label>
                </div>
                <span className="text-sm font-medium">
                  ₱{test.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background rounded-lg mt-4 shadow-sm">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            Select Individual Laboratory Tests:
          </h2>
          <div className="p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {permissionsData.map((permission, index) => (
                <div
                  key={`${permission.id}-${index}`}
                  className="flex items-center space-x-3"
                >
                  <Checkbox
                    id={`${permission.id}-${index}`}
                    checked={permissions[permission.id]}
                    className="h-5 w-5 rounded-sm border-gray-300 bg-gray-200"
                  />
                  <Label
                    htmlFor={`${permission.id}-${index}`}
                    className="text-base font-medium"
                  >
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg mt-4 shadow-sm">
          <h2 className="font-bold text-sm bg-primary text-white rounded-t-lg pl-2">
            Recommendation / Perscription
          </h2>
          <Editor />
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 gap-2">
          <Link href={"/appointment"}>
            <Button className="bg-[#FF2222] cursor-pointer" size="lg">
              <Trash /> Cancel
            </Button>
          </Link>
          <div className="flex flex-row gap-2">
            <Button
              className="bg-[#11C7BC] cursor-pointer"
              size="lg"
              onClick={() =>
                router.push(
                  `/appointment/success?priorityNo=${clientDetails?.priorityNo}`
                )
              }
            >
              <Save /> Submit Lab Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
