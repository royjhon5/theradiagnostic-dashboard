"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import ClientResultEntry from "./ui";
import MainProvider from "./context/context-provider";

export default function ClientResultEntryContainer() {
  return (
    <MainProvider>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold mb-2">
            <h2 className="text-2xl">Client Result Entry</h2>
            <DynamicBreadcrumb />
          </div>
          <div>
            <ClientResultEntry />
          </div>
        </div>
      </div>
    </MainProvider>
  );
}
