import AreaChart, { Data } from "@/components/chart/AreaChart";
import HeaderChart from "@/components/chart/HeaderChart";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CardHeaderChartProps {
  title: string;
  description: string;
  value: number;
  data?: Data[];
}

const CardHeaderChart: React.FC<CardHeaderChartProps> = ({ title, description, value, data }) => {
  return (
    <Card>
      <div className="grid grid-cols-2">
        <div>1</div>
       
        <div>
          <HeaderChart data={data} />
        </div>
      </div>
    </Card>
  );
};
export default CardHeaderChart;
