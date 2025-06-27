"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import MainProvider from "./context/context-provider";
import useGetCountNowServing from "@/app/queue-screen/hooks/useGetCountNowServing";
import { globalClientSchema } from "./schema/schema";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/column-header";

export default function ClientResultEntryContainer() {
  const { servingData } = useGetCountNowServing();
  const result = globalClientSchema.parse(servingData);

  return (
    <MainProvider>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold mb-2">
            <h2 className="text-2xl">Result Evaluation</h2>
            <DynamicBreadcrumb />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <DataTable data={result} columns={columns} />
            <div className="col-span-2"></div>
          </div>
        </div>
      </div>
    </MainProvider>
  );
}
