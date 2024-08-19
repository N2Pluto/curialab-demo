import { Data } from "@/components/chart/AreaChart";
import HeaderChart from "@/components/chart/HeaderChart";
import { Card } from "@/components/ui/card";

interface CardHeaderChartProps {
  title: string;
  description: string;
  value: number;
  data?: Data[];
}

const CardHeaderChart: React.FC<CardHeaderChartProps> = ({ title, value, data }) => {
  return (
    <Card className="p-4 space-y-4 h-auto rounded-2xl">
      <div className="grid grid-cols-2 h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="text-xl">{title}</div>
          <p className="text-base">{Math.floor(value).toLocaleString()}</p>
        </div>

        <div className="flex items-center justify-center">
          <HeaderChart data={data} />
        </div>
      </div>
    </Card>
  );
};
export default CardHeaderChart;
