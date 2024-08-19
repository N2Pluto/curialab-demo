"use client";
import { Area, AreaChart as ReChartAreaChart, CartesianGrid, XAxis, YAxis, Label, ReferenceLine } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import formatNumber from "@/utils/format";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { max } from "d3-array";

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
  y3: number;
  y4: number;
  y5: number;
  y6: number;
  y7: number;
}

interface CardHoldingPeriodProps {
  title?: string;
  description?: string;
  value?: number;
  data?: Data[];
  height?: number;
  width?: string;
  label: string;
  unit?: string;
}

const HoldingPeriod: React.FC<CardHoldingPeriodProps> = ({ data, height, width, label, unit }) => {
  console.log("data", data);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const latestEntry = data?.[data.length - 1];

  const customTooltip = ({ active, payload, label }: any) => {
    console.log("payload", payload[0]?.payload.y1);

    if (active && payload && payload.length) {
      return (
        <div className="box-border  p-3  border-2 bg-white flex flex-col  columns-3 gap-2 rounded-lg">
          <p className="text-sm w-full text-center font-medium">{dayjs(label).format("MMM D YY")}</p>
          <div className="border-t  w-full"></div>
          <div className="text-center text-gray-500 font-semibold text-sm">Holder Percentage</div>
          <div className="flex items-center space-x-2">
            <HolderPeriodTag value={payload[0]?.payload.y1} title="> 1Y" color="#B9DBEE" unit="1" />
            <HolderPeriodTag value={payload[0]?.payload.y2} title="6M-1Y" color="#C0DFD6" unit="1" />
          </div>
          <div className="flex items-center space-x-2">
            <HolderPeriodTag value={payload[0]?.payload.y3} title="3-6M" color="#D7E5CD" unit="1" />
            <HolderPeriodTag value={payload[0]?.payload.y4} title="1-3M" color="#F7E8C4" unit="1" />
          </div>
          <div className="flex items-center space-x-2">
            <HolderPeriodTag value={payload[0]?.payload.y5} title="1W-1M" color="#F6D9B5" unit="1" />
            <HolderPeriodTag value={payload[0]?.payload.y6} title="<1W" color="#F5CEB9" unit="1" />
          </div>
          <div className="flex items-center space-x-2">
            <HolderPeriodTag value={payload[0]?.payload.y7} title="24H" color="#F8ADB6" unit="1" />
          </div>
          <div className="border-t w-full"></div>
          <div className="flex items-center space-x-2">
            <HolderPeriodTag value={payload[0]?.payload.y7} title="OP Price" color="#577590" />
          </div>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-slate-50 rounded-3xl ">
      <CardContent className="pt-4">
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{
            height: `550px`,
            maxHeight: `550px`,
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

            <XAxis dataKey="x" tickMargin={3} tickFormatter={(value) => dayjs(value).format("MMM YY")} />
            <YAxis dataKey="y1" orientation="left" yAxisId="left">
              <Label
                value="Holding percentage"
                offset={3}
                position="left"
                angle={270}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <YAxis
              dataKey="y"
              axisLine={false}
              tickLine={false}
              orientation="right"
              yAxisId="right"
              hide={windowWidth < 1024}
              // domain={[0, 5]}
              // tickFormatter={(value) => (value >= 1 && value <= 5 ? value : "")}
            >
              <Label value="OP Price" offset={3} position="right" angle={270} style={{ textAnchor: "middle" }} />
            </YAxis>

            <ChartTooltip content={customTooltip} />

            <Area
              dataKey="y7"
              fill="#F8ADB6"
              fillOpacity={1}
              strokeWidth={2}
              strokeOpacity={0}
              isAnimationActive={true}
              stackId="a"
              yAxisId="left"
            />
            <Area
              dataKey="y6"
              fill="#F5CEB9"
              fillOpacity={1}
              strokeWidth={2}
              strokeOpacity={0}
              isAnimationActive={true}
              stackId="a"
              yAxisId="left"
            />
            <Area
              dataKey="y5"
              fill="#F6D9B5"
              fillOpacity={1}
              strokeWidth={2}
              strokeOpacity={0}
              isAnimationActive={true}
              stackId="a"
              yAxisId="left"
            />
            <Area
              dataKey="y4"
              fill="#F7E8C4"
              fillOpacity={1}
              strokeWidth={2}
              strokeOpacity={0}
              isAnimationActive={true}
              stackId="a"
              yAxisId="left"
            />
            <Area
              dataKey="y3"
              fill="#D7E5CD"
              fillOpacity={1}
              strokeWidth={2}
              strokeOpacity={0}
              isAnimationActive={true}
              stackId="a"
              yAxisId="left"
            />
            <Area
              dataKey="y2"
              fill="#C0DFD6"
              fillOpacity={1}
              strokeWidth={2}
              strokeOpacity={0}
              isAnimationActive={true}
              stackId="a"
              yAxisId="left"
            />
            <Area
              dataKey="y1"
              fill="#B9DBEE"
              fillOpacity={1}
              strokeWidth={2}
              strokeOpacity={0}
              isAnimationActive={true}
              stackId="a"
              yAxisId="left"
            />
            <Area
              dataKey="y"
              fillOpacity={0}
              stroke="black"
              strokeWidth={2}
              strokeOpacity={0.4}
              isAnimationActive={true}
              yAxisId="right"
            />
          </ReChartAreaChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
};

export default HoldingPeriod;

interface TagProps {
  value: number;
  title: string;
  color: string;
  unit?: string;
}
const HolderPeriodTag: React.FC<TagProps> = ({ value, title, color, unit }) => {
  return (
    <>
      <div className={`rounded-full w-[14px] h-[14px] m-0 p-0 bg-[${color}]`}></div>
      <div>
        <div className="font-extralight text-gray-400">{title}</div>
        {unit === "1" ? (
          <div className="font-bold">{`${value.toFixed(2).toLocaleString()} %`}</div>
        ) : (
          <div className="font-bold">{`$${value.toFixed(2).toLocaleString()} `}</div>
        )}
      </div>
    </>
  );
};
