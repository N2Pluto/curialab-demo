import HoldingPeriod, { Data } from "@/components/chart/HoldingPeriodChart";
import DialogHolderChart from "@/components/dialog/DialogHolderChart";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CardHoldingPeriodProps {
  title: string;
  description: string;
  data?: Data[];
}

const CardHoldingPeriod: React.FC<CardHoldingPeriodProps> = ({ title, description, data }) => {
  const latestEntry = data?.[data.length - 1];
  const latestPrice = latestEntry ? latestEntry.y : 0;

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
          <DialogHolderChart title={title} data={data} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:space-x-4 space-y-4 md:space-y-0 items-baseline text-sm">
        <Card className="p-4 space-y-2 h-auto rounded-2xl w-full md:w-auto">
          <div className="flex items-center space-x-2 w-full justify-center">
            <div className="rounded-full w-[16px] h-[16px] m-0 p-0 bg-[#577590]"></div>
            <p>OP Price</p>
          </div>
          <div className="flex justify-center">{latestPrice.toFixed(2)}</div>
        </Card>
        <Card className="p-4 gap-3 h-auto rounded-2xl flex flex-wrap w-full md:w-auto ">
          <HolderPeriodTag value={latestEntry?.y1 || 0} title="> 1Y" color="bg-[#B9DBEE]" />
          <HolderPeriodTag value={latestEntry?.y2 || 0} title="6M-1Y" color="#C0DFD6" />
          <HolderPeriodTag value={latestEntry?.y3 || 0} title="3-6M" color="#D7E5CD" />
          <HolderPeriodTag value={latestEntry?.y4 || 0} title="1-3M" color="#F7E8C4" />
          <HolderPeriodTag value={latestEntry?.y5 || 0} title="1W-1M" color="#F6D9B5" />
          <HolderPeriodTag value={latestEntry?.y6 || 0} title="<1W" color="#F5CEB9" />
          <HolderPeriodTag value={latestEntry?.y7 || 0} title="24H" color="#F8ADB6" />
        </Card>
      </div>

      <div>
        <HoldingPeriod data={data} />
      </div>
    </Card>
  );
};
export default CardHoldingPeriod;

interface TagProps {
  value: number;
  color: string;
  title: string;
}

const HolderPeriodTag: React.FC<TagProps> = ({ value, title, color }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className={`rounded-full w-4 h-4 min-w-4 min-h-4 m-0 p-0 ${color}`}></div>
        <div>{title}</div>
      </div>
      <div className="flex">{value.toFixed(2)} %</div>
    </div>
  );
};
