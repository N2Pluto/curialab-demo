import AreaChart, { Data } from "@/components/chart/AreaChart";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CardAreaChartProps {
  title: string;
  description: string;
  value: number;
  data?: Data[];
}

const CardAreaChart: React.FC<CardAreaChartProps> = ({ title, description, value, data }) => {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex space-x-1 items-center">
        <p className="text-xl">{title}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xl">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex justify-end space-x-2 items-baseline">
        <p className="text-3xl">{Math.floor(value).toLocaleString()}</p>
        <p>Tokens</p>
      </div>

      <div>
        <AreaChart data={data}/>
      </div>
    </Card>
  );
};
export default CardAreaChart;
