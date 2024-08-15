import axiosInstance from "@/lib/axiosInstance";

const getPrice = async () => {
  const path = "/stats/op-price";

  const { data } = await axiosInstance.get(path);
  return data;
};

const curiahubServices = {
  getPrice
};
export default curiahubServices;
