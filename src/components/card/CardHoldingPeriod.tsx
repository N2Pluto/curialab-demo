
import HoldingPeriod, { Data } from "@/components/chart/HoldingPeriodChart";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CardHoldingPeriodProps {
  title: string;
  description: string;
  data?: Data[];
}

const CardHoldingPeriod: React.FC<CardHoldingPeriodProps> = ({ title, description, data }) => {
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
      <div className="flex justify-end space-x-2 items-baseline"></div>

      <div>
        <HoldingPeriod data={data} />
      </div>
    </Card>
  );
};
export default CardHoldingPeriod;
