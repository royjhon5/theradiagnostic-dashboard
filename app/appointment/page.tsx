"use client";

import CalendarAppointment from "@/components/calendar-demo";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./components/data-table";
import data from "./data.json";
import { DataColumns } from "./components/columns";
import MainProvider from "./context/context-provider";

export default function AppointMent() {
  return (
    <MainProvider>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-1 text-blue-500 font-bold mb-5">
            <h2 className="text-2xl">Appointment</h2>
            <DynamicBreadcrumb />
          </div>
          <Tabs
            defaultValue="calendar"
            className="w-full flex-col justfiy-start gap-2"
          >
            <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar" className="bg-background rounded-xl">
              <CalendarAppointment />
            </TabsContent>
            <TabsContent value="list" className="">
              <DataTable data={data} columns={DataColumns} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainProvider>
  );
}
