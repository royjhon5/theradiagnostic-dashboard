"use client";
import TotalAppointments from "./total-appoinemt-card";
import TotalClientCard from "./total-client-cards";
import TotalEmployee from "./total-employees";
import TotalSales from "./total-sales";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <TotalEmployee />
      <TotalSales />
      <TotalAppointments />
      <TotalClientCard />
    </div>
  );
}
