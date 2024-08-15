import { IMetrics } from "@/interfaces/stats.interface";
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

const curiahubServices = {
  getPrice,
  getHolder
};

export default curiahubServices;
