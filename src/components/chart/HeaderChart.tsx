"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart as ReChartAreaChart, CartesianGrid, XAxis, YAxis, Label } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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
}

const HeaderChart: React.FC<AreaChartProps> = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    <div>
      {/* <ChartContainer
        config={chartConfig}
        className="w-full"
        style={{
          height: `90px`,
          maxHeight: `90px`,
          width: `115px`
        }}
      > */}

      <ChartContainer
        config={chartConfig}
        className="w-full"
        style={{
          height: `90px`,
          maxHeight: `90px`,
          width: `115px`,
          maxWidth: `115px`,
          boxSizing: "border-box",
          overflow: "hidden",
          ...(windowWidth < 1024 && { height: "220px", maxHeight: "220px", width: "100%", maxWidth: "100%" }
          ),
          ...(windowWidth < 800 && { height: "120px", maxHeight: "120px", width: "100%", maxWidth: "100%" }
          ),
        }}
      >
        <ReChartAreaChart accessibilityLayer data={data}>
          <defs>
            <linearGradient id="colorRedWhite" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="red" stopOpacity={0.8} />
              <stop offset="100%" stopColor="white" stopOpacity={0.4} />
            </linearGradient>
          </defs>

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
