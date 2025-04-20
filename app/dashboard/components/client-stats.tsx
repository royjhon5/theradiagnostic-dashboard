"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChevronDown } from "lucide-react";
const chartData = [
  { browser: "safari", visitors: 70, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function ClientDashboard() {
  return (
    <Card className="w-full shadow border">
      <CardHeader className="items-center pb-0"></CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-medium text-zinc-800">Patiens</h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200">
            Today <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
          <div className="col-span-1">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[150px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={0}
                endAngle={250}
                innerRadius={35}
                outerRadius={45}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  polarRadius={[38, 30]}
                />
                <RadialBar dataKey="visitors" cornerRadius={8} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-lg font-bold"
                            >
                              {chartData[0].visitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 12}
                              className="fill-muted-foreground text-xs"
                            >
                              percent
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </div>
          <div className="col-span-2">
            <p className="text-zinc-600 mb-1">Total Patients</p>
            <h3 className="text-4xl font-bold">500</h3>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-zinc-200 text-center">
            <p className="text-xl font-bold">250</p>
            <p className="text-zinc-500 text-sm">In-Patient</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 text-center">
            <p className="text-xl font-bold">150</p>
            <p className="text-zinc-500 text-sm">Out-Patient</p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 text-center">
            <p className="text-xl font-bold">100</p>
            <p className="text-zinc-500 text-sm">Consultancy</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center p-2 pt-0">
        <a href="#" className="text-sm text-emerald-500 font-bold">
          See All
        </a>
      </CardFooter>
    </Card>
  );
}
