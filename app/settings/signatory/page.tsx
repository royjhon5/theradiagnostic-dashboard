"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import useGetSignatory from "./hooks/useGetSignatory";
import { globalGetSignatorySchema } from "./schema";
import MainProvider from "./context/context-provider";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/column-header";
import { DialogContainer } from "./data-table-components/dialog-container";

export default function Signatory() {
  const { signatoryData } = useGetSignatory();
  const result = globalGetSignatorySchema.parse(signatoryData);
  return (
    <MainProvider>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold">
            <h2 className="text-2xl">Signatory Settings</h2>
            <DynamicBreadcrumb />
          </div>
          <div className="mt-5">
            <DataTable data={result} columns={columns} />
          </div>
        </div>
      </div>
      <DialogContainer />
    </MainProvider>
  );
}
