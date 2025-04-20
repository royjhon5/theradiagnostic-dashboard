import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ClientData from "../clientsdata.json";
import { Loader2, ThumbsUp } from "lucide-react";

export default function PatientListing() {
  return (
    <Card className="w-full shadow border">
      <CardHeader className="px-6 py-4 flex flex-row justify-between items-center">
        <h2 className="text-lg font-medium">Client</h2>
        <a href="#" className="text-sm text-emerald-500 font-medium">
          See All
        </a>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <div className="grid grid-cols-3 mb-2">
          <div className="text-sm text-zinc-500 ">Name</div>
          <div className="text-sm text-zinc-500 text-center">Appointment</div>
          <div className="text-sm text-zinc-500 text-center">Status</div>
        </div>
        <div>
          <ScrollArea className="h-80">
            {ClientData.map((client, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center py-2 px-3"
              >
                <div className="flex flex-start gap-2">
                  <Avatar>
                    <AvatarImage
                      src={client.avatar_image}
                      alt="Marcus Curtis"
                    />
                  </Avatar>
                  <span className="text-sm font-small text-center">
                    {client.patient_name}
                  </span>
                </div>
                <div className="text-sm text-zinc-500 text-center">
                  {client.appointment_type}
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Badge variant="outline">
                    {client.status === "done" ? (
                      <ThumbsUp className="animate-shake" />
                    ) : (
                      <Loader2 className="animate-spin" />
                    )}
                    {client.status === "done" ? "Done" : "On-going"}
                  </Badge>
                </div>
              </div>
            ))}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
