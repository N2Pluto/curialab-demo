"use client";

import { useEffect, useMemo, useState } from "react";
import { IMetrics } from "@/interfaces/stats.interface";
import curiahubServices from "@/services/curiahub.services";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

const CardHeaderChart = dynamic(() => import("@/components/card/CardHeaderChart"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

const CardAreaChart = dynamic(() => import("@/components/card/CardAreaChart"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export function HomePage() {
  const [metrics, setMetrics] = useState<IMetrics[]>([]);
  const [latestMetrics, setLatestMetrics] = useState<IMetrics>();

  const holderWallet = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: dayjs(metric.date).format("MMM D YYYY"),
        y: metric.holderWallet
      };
    });
  }, [metrics]);

  const totalSupply = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: dayjs(metric.date).format("MMM D YYYY"),
        y: metric.maxTotalSupply
      };
    });
  }, [metrics]);

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

  const votableSupplyPercentage = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: dayjs(metric.date).format("MMM D YYYY"),
        y: (metric.votableSupply / metric.circulatingSupply) * 100
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
    <div className="space-y-4">
      <div className="bg-background space-y-4 ">
        <div className="container px-20">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-center">
            <div className="text-5xl text-red-500 ">Holder metrics</div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="">
                <CardHeaderChart
                  title="Holder Wallets"
                  description="The amount of tokens that are circulating in the market and are tradeable by the public."
                  value={latestMetrics?.holderWallet || 0}
                  data={holderWallet}
                />
              </div>
              <div className="">
                <CardHeaderChart
                  title="Total Supply"
                  description="The amount of tokens that are circulating in the market and are tradeable by the public."
                  value={latestMetrics?.maxTotalSupply || 0}
                  data={totalSupply}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container space-y-4 px-20">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CardAreaChart
            title="Circulating Supply"
            description="The amount of tokens that are circulating in the market and are tradeable by the public."
            value={latestMetrics?.circulatingSupply || 0}
            data={circulatingSupply}
            height={450}
            label="Tokens"
            unit="token"
          />
          <CardAreaChart
            title="Votable Supply"
            description="The total amount of tokens that is delegated to vote."
            value={latestMetrics?.votableSupply || 0}
            data={votableSupply}
            height={450}
            label="Tokens"
            unit="token"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 ">
          <CardAreaChart
            title="Share of Votable Supply"
            description="The percentage of tokens that are circulating in the market and are tradeable by the public."
            value={(Number(latestMetrics?.votableSupply) / Number(latestMetrics?.circulatingSupply)) * 100 || 0}
            data={votableSupplyPercentage}
            height={300}
            label="Votable supply percentage"
            unit="percent"
          />
        </div>
      </div>
    </div>
  );
}
