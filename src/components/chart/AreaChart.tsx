"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart as ReChartAreaChart, CartesianGrid, XAxis, YAxis, Label } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import formatNumber from "@/utils/format";

const chartConfig = {
  x: {
    label: "date",
    color: "black"
  }
} satisfies ChartConfig;

export interface Data {
  x: string;
  y: number;
}

interface AreaChartProps {
  data?: Data[];
}

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      console.log("payload", payload);
      console.log("label", label);
      return <div>{`${label}: ${formatNumber(payload[0].value)}`}</div>;
    }

    return null;
  };

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ReChartAreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12
            }}
            height={200}
          >
            <defs>
              <linearGradient id="colorRedWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="red" stopOpacity={0.8} />
                <stop offset="100%" stopColor="white" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="x" tickMargin={8} tickFormatter={(value) => value.slice(0, 90)}>
            <Label value="Months" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => formatNumber(value)} />
            {/* <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} /> */}
            <ChartTooltip content={customTooltip} />
            <Area
              dataKey="y"
              type="natural"
              //   fill="var(--color-desktop)"
              //   fillOpacity={0.4}
              //   stroke="var(--color-desktop)"
              fill="url(#colorRedWhite)"
              fillOpacity={0.4}
              stroke="red"
            />
          </ReChartAreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AreaChart;
