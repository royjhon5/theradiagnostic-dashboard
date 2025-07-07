"use client";

import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import MainProvider from "./context/context-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { globalGetDiscountSchema } from "./schema";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/column-header";
import { DialogContainer } from "./data-table-components/dialog-container";
import useGetDiscount from "./hooks/useGetDiscount";

export default function AddNewTestLaboratory() {
  const { discountData } = useGetDiscount();
  const result = globalGetDiscountSchema.parse(discountData);
  const user = Cookies.get("user");
  const userId = Cookies.get("userid");
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  let Username: string | null = null;
  if (user) {
    const parsedUser = JSON.parse(user);
    Username = parsedUser.username;
  }
  return (
    <MainProvider>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold">
            <h2 className="text-2xl">Add New Discount</h2>
            <DynamicBreadcrumb />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 flex flex-col gap-3">
            <div className="col-span-2">
              <div className="bg-background p-2 border-l rounded-lg border-primary shadow-sm mt-2">
                <div className="flex flex-col md:flex-row gap-4 md:justify-between">
                  {/* Avatar */}
                  <div className="flex flex-row gap-2 items-center">
                    <Avatar className="w-15 h-15">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                      <p style={{ fontSize: 10 }}>Performed by:</p>
                      <p className="text-md font-bold">{Username}</p>
                      <p className="text-sm">ID: {userId}</p>
                    </div>
                  </div>
                  {/* right side */}
                  <div className="flex flex-col justify-end md:text-right">
                    <p className="text-md font-bold">{formattedDate}</p>
                    <p style={{ fontSize: 10 }}>Date of Addition</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <DataTable data={result} columns={columns} />
              </div>
              <DialogContainer />
            </div>
          </div>
        </div>
      </div>
    </MainProvider>
  );
}
