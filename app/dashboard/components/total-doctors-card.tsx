import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconTrendingUp } from "@tabler/icons-react";
import { Dot, Line, LineChart, CartesianGrid } from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import React from "react";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 100, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 273, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--primary)",
  },
  chrome: {
    label: "Chrome",
    color: "var(--primary)",
  },
  safari: {
    label: "Safari",
    color: "var(--primary)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--primary)",
  },
  edge: {
    label: "Edge",
    color: "var(--primary)",
  },
  other: {
    label: "Other",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const TotalDoctors: React.FC = () => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Doctors</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          100
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[50px] w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} className="p-0" />
            <Line
              dataKey="visitors"
              type="natural"
              stroke="var(--color-visitors)"
              strokeWidth={1}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.browser}
                    r={1}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.fill}
                    stroke={payload.fill}
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TotalDoctors;
