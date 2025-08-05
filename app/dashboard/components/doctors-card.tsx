"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import useGetUsers from "@/app/settings/user-management/hooks/useGetUsers";

export default function DoctorsListing() {
  const { usersData } = useGetUsers();
  return (
    <Card className="w-full border">
      <CardHeader className="px-6 py-4 flex flex-row justify-between items-center">
        <h2 className="text-lg font-medium">Employees</h2>
        <a href="#" className="text-sm text-emerald-500 font-medium">
          See All
        </a>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <div className="grid grid-cols-3 mb-2">
          <div className="text-sm text-zinc-500 ">Name</div>
          <div className="text-sm text-zinc-500 text-center">Specialist</div>
          <div className="text-sm text-zinc-500 text-center">License No.</div>
        </div>
        <ScrollArea className="h-80">
          {usersData.map((doctor, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center py-2 px-3"
            >
              <div className="flex flex-start gap-2">
                <span className="text-sm font-small text-center">
                  {doctor.firstName} {doctor.lastName}
                </span>
              </div>
              <div className="text-sm text-zinc-500 text-center">
                {doctor.roles}
              </div>
              <div className="flex flex-row justify-center items-center">
                <Badge variant="outline">{doctor.licenseNumber}</Badge>
              </div>
            </div>
          ))}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
