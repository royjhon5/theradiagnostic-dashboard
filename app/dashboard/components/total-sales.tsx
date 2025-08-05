import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import useGetTotalSales from "../hooks/useGetTotalSales";
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};
const TotalSales: React.FC = () => {
  const { totalsales } = useGetTotalSales();
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Sales</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center md:mt-5 text-1xl @[250px]/card:text-3xl">
        {totalsales.map((data, index) => (
          <p key={index}> {formatPrice(Number(data?.totalAmount))}</p>
        ))}
      </CardContent>
    </Card>
  );
};

export default TotalSales;
