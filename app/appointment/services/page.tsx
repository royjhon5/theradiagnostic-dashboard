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
import { steps } from "../client-registration/data";
import useGetLaboratoryPackage from "@/app/settings/test-package/hooks/useGetLaboratoryPackage";

const Services = () => {
  const { laboratoryPackage } = useGetLaboratoryPackage();
  console.log("laboratoryPackage", laboratoryPackage);
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
  const [currentStep, setCurrentStep] = useState(2);
  const handleItemClick = (label: string) => {
    if (label === "Basic 5" || label === "Doctors Consultation") {
      router.push(
        `/appointment/payment?priorityNo=${clientDetails?.priorityNo}&&labpackde=${label}&&clientId=${currentId}`
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
                    {laboratoryPackage.map((item) => (
                      <ListboxItem
                        key={item.id}
                        value={item.packageName}
                        className="cursor-pointer"
                        onClick={() => handleItemClick(item.packageName)}
                      >
                        <div className="flex flex-col">
                          <div className="font-medium">{item.packageName}</div>
                          {item.packages.map((pkg, idx) => (
                            <div
                              className="text-muted-foreground text-sm flex flex-row"
                              key={idx}
                            >
                              {pkg.itemName}
                            </div>
                          ))}
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
