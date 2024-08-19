"use client";

import { useEffect, useMemo, useState } from "react";
import { IHolderPeriod, IMetrics } from "@/interfaces/stats.interface";
import curiahubServices from "@/services/curiahub.services";
import dynamic from "next/dynamic";

const CardHeaderChart = dynamic(() => import("@/components/card/CardHeaderChart"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

const CardAreaChart = dynamic(() => import("@/components/card/CardAreaChart"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

const CardHoldingPeriod = dynamic(() => import("@/components/card/CardHoldingPeriod"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export function HomePage() {
  const [metrics, setMetrics] = useState<IMetrics[]>([]);
  const [latestMetrics, setLatestMetrics] = useState<IMetrics>();
  const [holderPeriod, setHolderPeriod] = useState<IHolderPeriod[]>();

  const holderWallet = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: metric.date,
        y: metric.holderWallet
      };
    });
  }, [metrics]);

  const totalSupply = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: metric.date,
        y: metric.maxTotalSupply
      };
    });
  }, [metrics]);

  const circulatingSupply = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: metric.date,
        y: metric.circulatingSupply
      };
    });
  }, [metrics]);

  const votableSupply = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: metric.date,
        y: metric.votableSupply
      };
    });
  }, [metrics]);

  const votableSupplyPercentage = useMemo(() => {
    return metrics.map((metric) => {
      return {
        x: metric.date,
        y: (metric.votableSupply / metric.circulatingSupply) * 100
      };
    });
  }, [metrics]);

  const holdingPeriod = useMemo(() => {
    if (holderPeriod) {
      return holderPeriod.map((holderPeriod) => {
        const maxSum = 100;
        let remaining = maxSum;
        const randomValues = [];

        for (let i = 0; i < 6; i++) {
          const value = Math.floor(Math.random() * (remaining - (6 - i - 1)));
          randomValues.push(value);
          remaining -= value;
        }

        randomValues.push(remaining); // ใส่ค่า remaining ในตัวสุดท้าย (y7)

        const [y1, y2, y3, y4, y5, y6, y7] = randomValues;

        return {
          x: holderPeriod.date,
          y: holderPeriod.price,
          y1,
          y2,
          y3,
          y4,
          y5,
          y6,
          y7
        };
      });
    }
    return [];
  }, [holderPeriod]);

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

  const fetchHolderPeriod = async () => {
    try {
      const result = await curiahubServices.getHolderPeriod();
      if (result) {
        setHolderPeriod(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchHolder(), fetchHolderPeriod()]);
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-background space-y-4 lg:pt-10 pb-4">
        <div className="container mx-auto px-4">
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

      <div className="container mx-auto px-4 space-y-4 ">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CardAreaChart
            title="Circulating Supply"
            description="The amount of tokens that are circulating in the market and are tradeable by the public."
            value={latestMetrics?.circulatingSupply || 0}
            data={circulatingSupply}
            height="450px"
            label="Tokens"
            unit="Token"
          />
          <CardAreaChart
            title="Votable Supply"
            description="The total amount of tokens that is delegated to vote."
            value={latestMetrics?.votableSupply || 0}
            data={votableSupply}
            height="450px"
            label="Tokens"
            unit="Token"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 ">
          <CardHoldingPeriod
            title="Holding Period"
            description="The percentage of tokens that are circulating in the market and are tradeable by the public."
            data={holdingPeriod}
            height={450}
            label="Holding period"
            unit="percent"
            value={0}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 ">
          <CardAreaChart
            title="Share of Votable Supply"
            description="The percentage of tokens that are circulating in the market and are tradeable by the public."
            value={(Number(latestMetrics?.votableSupply) / Number(latestMetrics?.circulatingSupply)) * 100 || 0}
            data={votableSupplyPercentage}
            height="300px"
            label="Votable supply percentage"
            unit="percent"
            width="1160px"
          />
        </div>
      </div>
    </div>
  );
}
