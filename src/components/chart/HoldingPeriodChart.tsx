"use client";
import { Area, AreaChart as ReChartAreaChart, CartesianGrid, XAxis, YAxis, Label, ReferenceLine } from "recharts";

import { CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
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
  y1: number;
  y2: number;
}

interface CardHoldingPeriodProps {
  data?: Data[];
}

const HoldingPeriod: React.FC<CardHoldingPeriodProps> = ({ data }) => {
  const minValue = Math.min(...(data ?? []).map((d) => d.y));
  const maxValue = Math.max(...(data ?? []).map((d) => d.y));

  const domain = [minValue * 0.9, maxValue * 1.1];

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
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

  console.log("data", data);

  return (
    <div>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full" style={{ height: `550px`, maxHeight: `550px` }}>
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

            <XAxis dataKey="x" tickMargin={3} tickFormatter={(value) => dayjs(value).format("MMM YY")} />
            {/* <YAxis axisLine={false} tickLine={false} >
              <Label value="Holding percentage" offset={8} position="left" angle={270} style={{ textAnchor: "middle" }} />
            </YAxis> */}
            <YAxis yAxisId="left" dataKey="y1" orientation="left" />

            <YAxis dataKey="y" axisLine={false} tickLine={false}  orientation="right">
              <Label
                value="Holding percentage"
                offset={8}
                position="left"
                angle={270}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>

            <ChartTooltip content={customTooltip} />
            <Area
              dataKey="y"
              fillOpacity={0}
              stroke="black"
              strokeWidth={2}
              strokeOpacity={0.4}
              isAnimationActive={true}
            />
            <Area
              dataKey="y1"
              fill="red"
              fillOpacity={0.1}
              strokeWidth={2}
              strokeOpacity={0}
              isAnimationActive={true}
              stackId="a"
            />
            <Area
              dataKey="y2"
              fill="black"
              fillOpacity={0.1}
              strokeWidth={2}
              strokeOpacity={0}
              isAnimationActive={true}
              stackId="a"
            />
          </ReChartAreaChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
};

export default HoldingPeriod;
