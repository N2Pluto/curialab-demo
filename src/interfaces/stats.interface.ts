export interface IMetrics {
  circulatingSupply: number;
  date: string;
  holderWallet: number;
  maxTotalSupply: number;
  votableSupply: number;
}

export interface IHolderPeriod {
  amount: number;
  date: string;
  price: number;
  volume: number;
  holderPercent?: {
    period24h: number;
    period24h1w: number;
    period1w1m: number;
    period1m3m: number;
    period3m6m: number;
    period6m1y: number;
    period1y: number;
  };

}
