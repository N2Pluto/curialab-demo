"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart as ReChartAreaChart, CartesianGrid, XAxis, YAxis, Label } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
  title?: string;
  description?: string;
  value?: number;
  data?: Data[];
}

const HeaderChart: React.FC<AreaChartProps> = ({ data }) => {
  return (
    <div>

        <ChartContainer config={chartConfig}>
          <ReChartAreaChart accessibilityLayer data={data}>
            <defs>
              <linearGradient id="colorRedWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="red" stopOpacity={0.8} />
                <stop offset="100%" stopColor="white" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />

            <Area
              dataKey="y"
              fill="url(#colorRedWhite)"
              fillOpacity={0.4}
              stroke="red"
              strokeWidth={1}
              strokeOpacity={0.4}
              isAnimationActive={true}
            />
          </ReChartAreaChart>
        </ChartContainer>

    </div>
  );
};

export default HeaderChart;
