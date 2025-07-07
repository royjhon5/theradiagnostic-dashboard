"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import MainProvider from "../client-list/context/context-provider";
import { DialogContainer } from "./data-table-components/dialog-container";
import Registration from "./data/Registration";

export default function ClientRegistration() {
  return (
    <MainProvider>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="">
            <div className="flex flex-col gap-1 text-blue-500 font-bold mb-5">
              <h2 className="text-2xl">Client Registration</h2>
              <DynamicBreadcrumb />
            </div>

            <Registration />
          </div>
        </div>
      </div>
      <DialogContainer />
    </MainProvider>
  );
}
