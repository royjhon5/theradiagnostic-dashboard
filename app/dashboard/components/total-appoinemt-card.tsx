import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import useGetallClient from "../hooks/useGetTotalClient";

const TotalAppointments: React.FC = () => {
  const { totalclient } = useGetallClient();

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Appointments</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center md:mt-5 text-2xl @[250px]/card:text-4xl">
        {totalclient.map((data, index) => (
          <p key={index}>{data.totalData}</p>
        ))}
      </CardContent>
    </Card>
  );
};

export default TotalAppointments;
