"use client";

import useGetClientById from "@/app/client-list/client/useGetClientById";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import {
  Listbox,
  ListboxItem,
  ListboxItemIndicator,
} from "@/components/ui/listbox";
import { Stepper } from "@/components/ui/stepper";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Services = () => {
  const searchParams = useSearchParams();
  const raw = searchParams.get("clientId");
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
  const router = useRouter();
  const tricks = [
    {
      label: "Basic 5",
      description:
        "CBC, Urinary Analysis, Stool Examination, Chest X-Ray, Physical Exam",
    },
    {
      label: "Doctors Consultation",
      description: "",
    },
    {
      label: "Basic & Special Laboratory Test",
      description: "",
    },
    {
      label: "X-Ray",
      description: "",
    },
    {
      label: "Others",
      description: "",
    },
  ];
  const steps = [
    { title: "Client Registration", description: "Step 1" },
    { title: "Service", description: "Step 2" },
    { title: "Done", description: "Step 3" },
  ];

  const [currentStep, setCurrentStep] = useState(2);

  const handleItemClick = (label: string) => {
    if (label === "Basic 5" || label === "Doctors Consultation") {
      router.push(
        `/appointment/success?priorityNo=${clientDetails?.priorityNo}`
      );
    } else {
      router.push(`/appointment/laboratory-testing?clientId=${currentId}`);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold">
            <h2 className="text-2xl">Service Package</h2>
            <DynamicBreadcrumb />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 flex flex-col gap-3 mt-4">
            <div className="col-span-2">
              <div className="w-full justify-between flex items-center mb-4 bg-background shadow-sm p-4 rounded-lg border">
                <Stepper
                  steps={steps}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                />
              </div>
              <div className="flex justify-center items-center grid grid-cols-1 md:grid-cols-1 mt-5">
                <div className="bg-background rounded-lg p-2">
                  <Listbox>
                    {tricks.map((trick) => (
                      <ListboxItem
                        key={trick.label}
                        value={trick.label}
                        className="cursor-pointer"
                        onClick={() => handleItemClick(trick.label)}
                      >
                        <div className="flex flex-col">
                          <div className="font-medium">{trick.label}</div>
                          <div className="text-muted-foreground text-sm">
                            {trick.description}
                          </div>
                        </div>
                        <ListboxItemIndicator />
                      </ListboxItem>
                    ))}
                  </Listbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
