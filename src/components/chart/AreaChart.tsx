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
}

interface AreaChartProps {
  title?: string;
  description?: string;
  value?: number;
  data?: Data[];
  height?: number;
  label: string;
  unit?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, height, label, unit }) => {
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

  const tickFormatter = (value: number) => {
    if (unit === "percent") {
      return value.toFixed(0) + "%";
    } else {
      return formatNumber(value);
    }
  };

  const domainFormatter = () => {
    if (unit === "percent") {
      return undefined;
    } else {
      return domain;
    }
  };

  return (
    <div>
      <CardContent>
        <ChartContainer config={chartConfig} className={`max-h-[${height}px] w-full`}>
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
            <YAxis axisLine={false} tickLine={false} tickFormatter={tickFormatter} domain={domainFormatter()}>
              <Label value={label} offset={8} position="left" angle={270} style={{ textAnchor: "middle" }} />
            </YAxis>
            {unit === "percent" && (
              <>
                <ReferenceLine
                  x="Oct 20 2023"
                  stroke="rgb(192, 223, 214)"
                  label={{ value: "Season 4", position: "insideTopRight" }}
                  strokeDasharray="4 4"
                  fill="none"
                  strokeWidth="2"
                />
                <ReferenceLine
                  x="May 18 2024"
                  stroke="rgb(185, 219, 238)"
                  label={{ value: "Season 5", position: "insideTopRight" }}
                  strokeDasharray="4 4"
                  strokeWidth="2"
                />
                <ReferenceLine
                  x="Aug 16 2024"
                  stroke="rgb(245, 206, 185)"
                  label={{ value: "Season 6", position: "insideTopRight" }}
                  strokeDasharray="4 4"
                  strokeWidth="2"
                />
              </>
            )}

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
