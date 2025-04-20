import Image from "next/image";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import DoctorsListing from "./components/doctors-card";
import PatientListing from "./components/patients-card";
import { SectionCards } from "./components/section-cards";
import { Calendar } from "@/components/ui/calendar";
import CardTimeLine from "./components/timeline-card";
import ClientDashboard from "./components/client-stats";

export default async function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5">
      <div className="col-span-4">
        <div className="flex flex-col gap-2 py-4 md:gap-3 md:py-6">
          <SectionCards />
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-3">
            <DoctorsListing />
            <PatientListing />
            <ClientDashboard />
          </div>
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1">
              <ChartAreaInteractive />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-2 px-4 py-4 md:gap-3 md:py-6 items-center">
          <Image
            alt="default image"
            src="/personal_logo/defaultimage.jpg"
            width={100}
            height={100}
            priority
            className="rounded-full"
          />
          <h2 className="text-xl font-bold">Jakob Goerge</h2>
          <p>Administrator</p>
          <Calendar className="border rounded-lg w-full bg-background" />
          <CardTimeLine />
        </div>
      </div>
    </div>
  );
}
