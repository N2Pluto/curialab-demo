import { IHolderPeriod, IMetrics } from "@/interfaces/stats.interface";
import axiosInstance from "@/lib/axiosInstance";

interface ResGetPrice {
  price: number;
}

interface ResGetHolder {
  latestMetrics: IMetrics;
  metrics: IMetrics[];
}

const getPrice = async (): Promise<ResGetPrice> => {
  const path = "/stats/op-price";
  const { data } = await axiosInstance.get(path);
  return data;
};

const getHolder = async (): Promise<ResGetHolder> => {
  const path = "/stats/holder";
  const { data } = await axiosInstance.get(path);
  return data;
};

const getHolderPeriod = async (): Promise<IHolderPeriod[]> => {
  const path = "/stats/holding-period";
  const { data } = await axiosInstance.get(path);
  console.log("data", data);
  return data;
};

const curiahubServices = {
  getPrice,
  getHolder,
  getHolderPeriod
};

export default curiahubServices;
