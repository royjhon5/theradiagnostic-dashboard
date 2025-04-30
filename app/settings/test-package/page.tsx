"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import TestPackageData from "./data/TestPackageData";

export default function AddLabTestManagement() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-blue-500 font-bold">
          <h2 className="text-2xl">Add Laboratory Test Package</h2>
          <DynamicBreadcrumb />
        </div>
        <div>
          <TestPackageData />
        </div>
      </div>
    </div>
  );
}
