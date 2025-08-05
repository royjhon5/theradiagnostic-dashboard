import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import useGetTotalEmployee from "../hooks/useGetTotalEmployees";

const TotalEmployee: React.FC = () => {
  const { totalemployee } = useGetTotalEmployee();

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Employee</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center md:mt-5 text-2xl @[250px]/card:text-4xl">
        {totalemployee.map((data, index) => (
          <p key={index}>{data.totalData}</p>
        ))}
      </CardContent>
    </Card>
  );
};

export default TotalEmployee;
