import AreaChart, { Data } from "@/components/chart/AreaChart";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CardAreaChartProps {
  title: string;
  description: string;
  value: number;
  data?: Data[];
  height?: number;
  label: string;
  unit?: string;
}

const CardAreaChart: React.FC<CardAreaChartProps> = ({ title, description, value, data, height, label, unit }) => {
  console.log("value", value);
  return (
    <Card className="p-6 space-y-4 h-auto rounded-2xl">
      <div className="flex space-x-1 items-center">
        <p className="text-xl">{title}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3" />
            </TooltipTrigger>
            <TooltipContent side="bottom" style={{ backgroundColor: "black" }}>
              <p className="text-xs text-white">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex justify-end space-x-2 items-baseline">
        {unit === "token" && (
          <>
            <p className="text-3xl">{Math.floor(value).toLocaleString()}</p>
            <p>{unit}</p>
          </>
        )}
        {unit === "percent" && (
          <>
            <p className="text-3xl">{value.toFixed(2)}</p>
            <p className="text-3xl">%</p>
          </>
        )}
      </div>

      <div>
        <AreaChart data={data} height={height} label={label} unit={unit} />
      </div>
    </Card>
  );
};
export default CardAreaChart;
