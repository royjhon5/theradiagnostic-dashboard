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
  const searchParams = useSearchParams();
  const raw = searchParams.get("clientId");
  let currentId: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (raw) {
    try {
      const decoded = decodeURIComponent(raw);
      currentId = JSON.parse(decoded);
    } catch (error) {
      console.error("Error parsing row data:", error);
    }
  }
  const { clientDetails } = useGetClientById(currentId);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const handleItemClick = (selectedPackage: (typeof laboratoryPackage)[0]) => {
    const isSpecial =
      selectedPackage.packageName === "Basic 5" ||
      selectedPackage.packageName === "Doctors Consultation";

    const targetPath = isSpecial
      ? "/appointment/payment"
      : "/appointment/laboratory-testing";

    router.push(
      `${targetPath}?clientId=${currentId}&priorityNo=${clientDetails?.[0]?.priorityNo || ""}&packageId=${selectedPackage.id}`
    );
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
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="w-full flex flex-row justify-between items-start">
                          <div>
                            <div className="font-medium">
                              {item.packageName}
                            </div>
                            {item.packages.map((pkg, idx) => (
                              <div
                                className="text-muted-foreground text-sm"
                                key={idx}
                              >
                                {pkg.itemName}
                              </div>
                            ))}
                          </div>
                          ₱ {item.totalPrice}
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
