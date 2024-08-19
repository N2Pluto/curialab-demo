import AreaChart, { Data } from "@/components/chart/AreaChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Expand, X } from "lucide-react";

interface DialogAreaChartProps {
  title?: string;
  description?: string;
  value?: number;
  data?: Data[];
  height?: string;
  width?: string;
  label: string;
  unit?: string;
}

const DialogAreaChart: React.FC<DialogAreaChartProps> = ({ title, data, height, width, label, unit }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full w-[40px] h-[40px] m-0 p-0 bg-slate-50 hover:bg-red-200">
          <Expand className="size-5 text-red-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full xl:min-w-[1300px] rounded-3xl lg:w-[1000px]">
        <div className="text-xl text-red-500 slide-up">Holder Metrics</div>
        <div className="text-[39px] text-gray-900 slide-up">{title}</div>
        <AreaChart data={data} height={height} label={label} unit={unit} width="100%" />
      </DialogContent>
    </Dialog>
  );
};

export default DialogAreaChart;
