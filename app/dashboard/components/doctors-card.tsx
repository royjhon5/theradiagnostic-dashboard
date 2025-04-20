import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import doctorData from "../doctordata.json";
import { Badge } from "@/components/ui/badge";
import { IconCircleFilled } from "@tabler/icons-react";

export default function DoctorsListing() {
  return (
    <Card className="w-full border">
      <CardHeader className="px-6 py-4 flex flex-row justify-between items-center">
        <h2 className="text-lg font-medium">Doctors</h2>
        <a href="#" className="text-sm text-emerald-500 font-medium">
          See All
        </a>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">
        <div className="grid grid-cols-3 mb-2">
          <div className="text-sm text-zinc-500 ">Name</div>
          <div className="text-sm text-zinc-500 text-center">Specialist</div>
          <div className="text-sm text-zinc-500 text-center">Status</div>
        </div>
        <ScrollArea className="h-80">
          {doctorData.map((doctor, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center py-2 px-3"
            >
              <div className="flex flex-start gap-2">
                <Avatar>
                  <AvatarImage src={doctor.image_avatar} alt="Marcus Curtis" />
                </Avatar>
                <span className="text-sm font-small text-center">
                  {doctor.fullname}
                </span>
              </div>
              <div className="text-sm text-zinc-500 text-center">
                {doctor.specialist}
              </div>
              <div className="flex flex-row justify-center items-center">
                <Badge variant="outline">
                  <IconCircleFilled
                    className={
                      doctor.status === "active"
                        ? "animate-pulse fill-green-500 mr-2"
                        : "fill-red-700 mr-2"
                    }
                  />
                  {doctor.status === "active" ? "Active" : "Offline"}
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
