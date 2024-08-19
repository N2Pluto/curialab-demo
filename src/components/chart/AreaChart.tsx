"use client";
import { Area, AreaChart as ReChartAreaChart, CartesianGrid, XAxis, YAxis, Label, ReferenceLine } from "recharts";

import { CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import formatNumber from "@/utils/format";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

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
  height?: string;
  width?: string;
  label: string;
  unit?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, height, width, label, unit }) => {
  const minValue = Math.min(...(data ?? []).map((d) => d.y));
  const maxValue = Math.max(...(data ?? []).map((d) => d.y));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const domain = [minValue * 0.9, maxValue * 1.1];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const customTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
      const value = Math.floor(payload[0].value).toLocaleString();
      const formattedLabel = dayjs(label).format("MMM D YY");
      return (
        <div>
          {unit === "percent" ? (
            <div className="box-border h-20 w-30 p-3  bg-white flex flex-col rounded-xl">
              <span className="font-bold text-[12px]">
                At<span className="text-red-400  pl-1">{formattedLabel}</span>
              </span>
              <div className="border-t my-3 w-full"></div>
              <div className="text-base font-bold pl-2">{`${value} %`}</div>
            </div>
          ) : (
            <div className="box-border h-22 w-40 p-3 border-2 bg-white flex flex-col items-end rounded">
              <p className="text-[10px] font-bold">{formattedLabel}</p>
              <div className="border-t my-3 w-full"></div>
              <div className="font-medium">{`${value} Token`}</div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const CustomizedTick = (props: any) => {
    const { x, y, payload } = props;

    return (
      <text x={x} y={y + 10} fill="#666" textAnchor="middle">
        {dayjs(payload.value).format("MMM YY")}
      </text>
    );
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
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{
            height,
            maxHeight: height,
            width,
            maxWidth: width,
            ...(windowWidth < 1024 && { height: "250px", maxHeight: "250px" })
          }}
        >
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

            <XAxis
              dataKey="x"
              tickMargin={3}
              tick={<CustomizedTick />}
              tickFormatter={(value) => dayjs(value).format("MMM YY")}
            />
            <YAxis axisLine={false} tickLine={false} tickFormatter={tickFormatter} domain={domainFormatter()}>
              <Label value={label} offset={8} position="left" angle={270} style={{ textAnchor: "middle" }} />
            </YAxis>
            {unit === "percent" && (
              <>
                <ReferenceLine
                  x="2023-10-20T00:00:00.000Z"
                  stroke="rgb(192, 223, 214)"
                  label={{ value: "Season 4", position: "insideTopRight" }}
                  strokeDasharray="4 4"
                  fill="none"
                  strokeWidth="2"
                />
                <ReferenceLine
                  x="2024-05-18T00:00:00.000Z"
                  stroke="rgb(185, 219, 238)"
                  label={{ value: "Season 5", position: "insideTopRight" }}
                  strokeDasharray="4 4"
                  strokeWidth="2"
                />
                <ReferenceLine
                  x="2024-08-16T00:00:00.000Z"
                  stroke="rgb(245, 206, 185)"
                  label={{ value: "Season 6", position: "insideTopRight" }}
                  strokeDasharray="4 4"
                  strokeWidth="2"
                />
              </>
            )}

            <ChartTooltip content={(props) => customTooltip({ ...props, unit })} />
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
