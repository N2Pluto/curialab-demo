import HoldingPeriod, { Data } from "@/components/chart/HoldingPeriodChart";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Expand } from "lucide-react";

interface DialogAreaChartProps {
  title?: string;
  data?: Data[];
}

const DialogHolderChart: React.FC<DialogAreaChartProps> = ({ title, data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full w-[40px] h-[40px] m-0 p-0 bg-slate-50 hover:bg-red-200">
          <Expand className="size-5 text-red-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-fit sm:rounded-2xl">
        <DialogClose />
        <div className="text-xl text-red-500">Holder Metrics</div>
        <div className="text-[39px] text-gray-900">{title}</div>

        <HoldingPeriod data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogHolderChart;
