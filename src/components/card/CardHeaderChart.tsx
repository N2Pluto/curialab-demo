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
    <Card className="rounded-lg">
      <div className="grid grid-cols-2">
        <div className="">
          <div>{title}</div>
          <p className="text-xs">{Math.floor(value).toLocaleString()}</p>
        </div>

        <div>
          <HeaderChart data={data} />
        </div>
      </div>
    </Card>
  );
};
export default CardHeaderChart;
