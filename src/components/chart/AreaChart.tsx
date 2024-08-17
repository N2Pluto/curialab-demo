"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart as ReChartAreaChart, CartesianGrid, XAxis, YAxis, Label } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import formatNumber from "@/utils/format";
import dayjs from "dayjs";

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

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  const minValue = Math.min(...(data ?? []).map((d) => d.y));
  const maxValue = Math.max(...(data ?? []).map((d) => d.y));

  const domain = [minValue * 0.9, maxValue * 1.1];

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      console.log("payload", payload);
      console.log("label", label);
      return (
        <div className="box-border h-22 w-40 p-3  border-2 bg-white flex flex-col items-end rounded">
          <p className="text-[10px]">{`${label}`}</p>
          <div className="border-t my-3 w-full"></div>
          <div>{`${Math.floor(payload[0].value).toLocaleString()} Token`}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ReChartAreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id="colorRedWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="red" stopOpacity={0.8} />
                <stop offset="100%" stopColor="white" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="x" tickMargin={3} tickFormatter={(value) => dayjs(value).format("MMM YY")} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => formatNumber(value)} domain={domain}>
              <Label value="Tokens" offset={8} position="left" angle={270} />
            </YAxis>
            <ChartTooltip content={customTooltip} />
            <Area
              dataKey="y"
              fill="url(#colorRedWhite)"
              fillOpacity={0.4}
              stroke="red"
              strokeWidth={2}
              strokeOpacity={0.4}
              isAnimationActive={true}
            />
          </ReChartAreaChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
};

export default AreaChart;
