import AreaChart, { Data } from "@/components/chart/AreaChart";
import DialogAreaChart from "@/components/dialog/DialogAreaChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Expand, Info } from "lucide-react";

interface CardAreaChartProps {
  title: string;
  description: string;
  value: number;
  data?: Data[];
  height?: string;
  width?:string;
  label: string;
  unit?: string;
}

const CardAreaChart: React.FC<CardAreaChartProps> = ({ title, description, value, data, height, width, label, unit }) => {
  console.log("value", value);
  return (
    <Card className="p-6 space-y-4 h-auto rounded-2xl">
      <div className="flex space-x-1 items-center justify-between">
        <div className="flex space-x-1">
          <p className="text-xl">{title}</p>
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3 " />
                </TooltipTrigger>
                <TooltipContent side="bottom" style={{ backgroundColor: "black" }}>
                  <p className="text-xs text-white">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="ml-auto  hidden lg:block">
          <DialogAreaChart title={title} data={data} height={height} width={width}  label={label} unit={unit} />
        </div>
      </div>
      <div className="flex justify-end space-x-2 items-baseline">
        {unit === "Token" && (
          <>
            <p className="text-[25px]">{Math.floor(value).toLocaleString()}</p>
            <p>Tokens</p>
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
