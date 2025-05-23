"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import useGetEmployersById from "../hooks/useGetEmployersById";
import { getEmployersByIdListSchema } from "../schema/schema";
import MainProvider from "../context/context-provider";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column-header";

export default function AddEmployer() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");
  const parsedData = JSON.parse(decodeURIComponent(dataParam || ""));
  const { employersData } = useGetEmployersById(parsedData.id || 0);
  const result = getEmployersByIdListSchema.parse(employersData);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  const user = Cookies.get("user");
  const userId = Cookies.get("userid");
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
            <h2 className="text-2xl">View Employees</h2>
            <DynamicBreadcrumb />
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <div className="col-span-2">
                <div className="bg-background p-2 border-l rounded-lg border-primary shadow-sm">
                  <div className="flex flex-col md:flex-row gap-4 md:justify-between">
                    {/* Avatar */}
                    <div className="flex flex-row gap-2 items-center">
                      <Avatar className="w-15 h-15">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0">
                        <p style={{ fontSize: 10 }}>Viewed by:</p>
                        <p className="text-md font-bold">{Username}</p>
                        <p className="text-sm">ID: {userId}</p>
                      </div>
                    </div>
                    {/* right side */}
                    <div className="flex flex-col justify-end md:text-right">
                      <p className="text-md font-bold">{formattedDate}</p>
                      <p style={{ fontSize: 10 }}>Date Viewed</p>
                    </div>
                  </div>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-sm mt-5">
                  <div className="mb-7 flex gap-2 flex-row md:flex-col">
                    <h2 className="font-bold text-sm text-blue-500">
                      Employers Details
                    </h2>
                    <div className="flex flex-col gap-0">
                      <p style={{ fontSize: 10 }}>Employers Name:</p>
                      <p className="text-md font-bold">
                        {parsedData.nameOfEmplyeer}
                      </p>
                      <p className="text-sm">Employers ID: {parsedData.id}</p>
                    </div>
                    <Separator />
                    <h2 className="font-bold text-sm text-blue-500">
                      Associated Employees
                    </h2>

                    <DataTable data={result} columns={columns} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainProvider>
  );
}
