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
  { browser: "chrome", visitors: 75, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 0, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 87, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 73, fill: "var(--color-edge)" },
  { browser: "other", visitors: 990, fill: "var(--color-other)" },
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

const TotalAppointments: React.FC = () => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Appointments</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          250
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
            +15.5%
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

export default TotalAppointments;
