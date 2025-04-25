import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import appointmentDAta from "../appointment.json";
import { Badge } from "@/components/ui/badge";

export default function TodaysAppointment() {
  return (
    <Card className="w-full border">
      <CardHeader className="px-6 py-4 flex flex-row justify-between items-center">
        <h2 className="text-lg font-medium text-[#11C7BC]">
          Todays Appointments
        </h2>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <div className="grid grid-cols-2 mb-2">
          <div className="text-sm text-zinc-500 ">Name</div>
          <div className="text-sm text-zinc-500">Status</div>
        </div>
        <ScrollArea className="h-80">
          {appointmentDAta.map((appointment, index) => (
            <div
              key={index}
              className="grid grid-cols-2 items-center py-2 gap-2"
            >
              <div className="flex flex-start">
                <span className="text-sm font-small text-center">
                  {appointment.patient_first_name}
                </span>
              </div>
              <div className="flex flex-row  items-center">
                <Badge>
                  {appointment.status === "Initial Consultation"
                    ? "Initial Consultation"
                    : appointment.status === "Available"
                      ? "Available"
                      : appointment.status === "Regular checkup"
                        ? "Regular checkup"
                        : "Follow-Up"}
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
