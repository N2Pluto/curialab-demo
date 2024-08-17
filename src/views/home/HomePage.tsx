"use client";
import CardAreaChart from "@/components/card/CardAreaChart";
import { useEffect, useMemo, useState } from "react";
import { IMetrics } from "@/interfaces/stats.interface";
import curiahubServices from "@/services/curiahub.services";
import dayjs from "dayjs";
import CardHeaderChart from "@/components/card/CardHeaderChart";

export function HomePage() {
  const [metrics, setMetrics] = useState<IMetrics[]>([]);
  const [latestMetrics, setLatestMetrics] = useState<IMetrics>();
  const circulatingSupply = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: dayjs(metric.date).format("MMM D YYYY"),
        y: metric.circulatingSupply
      };
    });
  }, [metrics]);

  const votableSupply = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: dayjs(metric.date).format("MMM D YYYY"),
        y: metric.votableSupply
      };
    });
  }, [metrics]);

  const fetchHolder = async () => {
    try {
      const result = await curiahubServices.getHolder();
      if (result) {
        setMetrics(result.metrics);
        setLatestMetrics(result.latestMetrics);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHolder();
  }, []);

  console.log(metrics);

  return (
    <div>
      <div className="bg-background ">
        <div className="container space-y-4 pb-5">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="">Holder metrics</div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="">
                <CardHeaderChart
                  title="Circulating Supply"
                  description="The amount of tokens that are circulating in the market and are tradeable by the public."
                  value={latestMetrics?.circulatingSupply || 0}
                  data={circulatingSupply}
                />
              </div>
              <div className="">
                <CardHeaderChart
                  title="Circulating Supply"
                  description="The amount of tokens that are circulating in the market and are tradeable by the public."
                  value={latestMetrics?.circulatingSupply || 0}
                  data={circulatingSupply}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container space-y-4 pt-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CardAreaChart
            title="Circulating Supply"
            description="The amount of tokens that are circulating in the market and are tradeable by the public."
            value={latestMetrics?.circulatingSupply || 0}
            data={circulatingSupply}
          />
          <CardAreaChart
            title="Votable Supply"
            description="The total amount of tokens that is delegated to vote."
            value={latestMetrics?.votableSupply || 0}
            data={votableSupply}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 ">
          <CardAreaChart
            title="Circulating Supply"
            description="The amount of tokens that are circulating in the market and are tradeable by the public."
            value={latestMetrics?.circulatingSupply || 0}
            data={circulatingSupply}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 ">
          <CardAreaChart
            title="Circulating Supply"
            description="The amount of tokens that are circulating in the market and are tradeable by the public."
            value={latestMetrics?.circulatingSupply || 0}
            data={circulatingSupply}
          />
        </div>
      </div>
    </div>
  );
}
