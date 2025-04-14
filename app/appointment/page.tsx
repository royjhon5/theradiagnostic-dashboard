"use client";

import CalendarAppointment from "@/components/calendar-demo";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumbs";

export default function AppointMent() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-1 text-blue-500 font-bold mb-5">
          <h2 className="text-2xl">Appointment</h2>
          <DynamicBreadcrumb />
        </div>
        <div className="bg-background border rounded-xl">
          <CalendarAppointment />
        </div>
      </div>
    </div>
  );
}
