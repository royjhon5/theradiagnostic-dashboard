import { TimelineLayout } from "@/components/timeline/timeline-layout";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { timelineData } from "../data";
import { CalendarCheck2 } from "lucide-react";

const CardTimeLine: React.FC = () => {
  return (
    <Card className="w-full shadow border">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium text-zinc-800">Appointments</h2>
        </div>
        <TimelineLayout
          items={timelineData}
          size="sm"
          animate={true}
          customIcon={<CalendarCheck2 />}
        />
      </CardContent>
    </Card>
  );
};

export default CardTimeLine;
