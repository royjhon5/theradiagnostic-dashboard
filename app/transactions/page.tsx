"use client";

import { columns } from "./components/column-header";
import { DataTable } from "./components/data-table";
import MainProvider from "./context/context-provider";
import TransactionData from "./MOCK_DATA.json";

export default function Transactions() {
  return (
    <MainProvider>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold mb-5">
            <h2 className="text-2xl">Transactions</h2>
          </div>
          <div>
            <DataTable data={TransactionData} columns={columns} />
          </div>
        </div>
      </div>
    </MainProvider>
  );
}
