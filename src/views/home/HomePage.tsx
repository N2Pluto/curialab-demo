"use client";
import CardAreaChart from "@/components/card/CardAreaChart";
import { useEffect, useMemo, useState } from "react";
import { IMetrics } from "@/interfaces/stats.interface";
import curiahubServices from "@/services/curiahub.services";
import dayjs from "dayjs";

export function HomePage() {
  const [metrics, setMetrics] = useState<IMetrics[]>([]);
  const [latestMetrics, setLatestMetrics] = useState<IMetrics>();
  const circulatingSupply = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: dayjs(metric.date).format("MMM D"),
        y: metric.circulatingSupply
      };
    });
  }, [metrics]);

  const votableSupply = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: dayjs(metric.date).format("MMM D"),
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
      <div className="container">
        <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}
