"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import MainProvider from "./context/context-provider";
import { DataTable } from "./components/data-table";
import data from "./data.json";
import { DataColumns } from "./components/columns";

export default function ClientRegistration() {
  return (
    <MainProvider>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold mb-5">
            <h2 className="text-2xl">Client List</h2>
            <DynamicBreadcrumb />
          </div>
          <div>
            <DataTable data={data} columns={DataColumns} />
          </div>
        </div>
      </div>
    </MainProvider>
  );
}
