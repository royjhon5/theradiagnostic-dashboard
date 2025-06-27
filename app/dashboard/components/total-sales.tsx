import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

const TotalSales: React.FC = () => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Sales</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center md:mt-5 text-2xl @[250px]/card:text-4xl">
        0.00
      </CardContent>
    </Card>
  );
};

export default TotalSales;
