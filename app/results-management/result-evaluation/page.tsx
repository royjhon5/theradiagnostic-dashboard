"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import MainProvider from "./context/context-provider";
import { globalClientForReview } from "./schema/schema";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/column-header";
import useGetClientForReview from "./hooks/useGetClientForReview";
import IframeComponent from "./ui/IframeComponent";
import ReleaseButton from "./ui/ReleaseButton";
import { DialogContainer } from "./data-table-components/dialog-container";

export default function ClientResultEntryContainer() {
  const { clientForReviewData } = useGetClientForReview();
  const result = globalClientForReview.parse(clientForReviewData);
  return (
    <MainProvider>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold mb-2">
            <h2 className="text-2xl">Result Evaluation</h2>
            <DynamicBreadcrumb />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <div className="col-span-1 flex flex-col gap-5">
              <DataTable data={result} columns={columns} />
              <ReleaseButton />
            </div>
            <div className="col-span-2">
              <div className="bg-background p-2 rounded-xl shadow-sm h-full">
                <IframeComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogContainer />
    </MainProvider>
  );
}
