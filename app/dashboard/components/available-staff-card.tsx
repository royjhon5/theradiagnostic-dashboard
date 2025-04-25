import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import availableStaffData from "../availablestaff.json";
import { Badge } from "@/components/ui/badge";
import { IconCircleFilled } from "@tabler/icons-react";

export default function AvailableStaffCard() {
  return (
    <Card className="w-full border">
      <CardHeader className="px-6 py-4 flex flex-row justify-between items-center">
        <h2 className="text-lg font-medium text-[#11C7BC]">Available Staff</h2>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <div className="grid grid-cols-2 mb-2">
          <div className="text-sm text-zinc-500 ">Name</div>
          <div className="text-sm text-zinc-500">Status</div>
        </div>
        <ScrollArea className="h-80">
          {availableStaffData.map((staff, index) => (
            <div
              key={index}
              className="grid grid-cols-2 items-center py-2 gap-2"
            >
              <div className="flex flex-start">
                <span className="text-sm font-small text-center">
                  {staff.patient_first_name}
                </span>
              </div>
              <div className="flex flex-row items-center">
                <Badge variant="outline">
                  <IconCircleFilled
                    className={
                      staff.status === "Available"
                        ? "animate-pulse fill-green-500 mr-2"
                        : "fill-red-700 mr-2"
                    }
                  />
                  {staff.status === "Available" ? "Available" : "Not-Available"}
                </Badge>
              </div>
            </div>
          ))}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
