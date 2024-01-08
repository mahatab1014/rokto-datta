import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDonorsData = () => {
  const axiosPublic = useAxiosPublic();
  const { data: donorsData, pending: donorsDataLoading } = useQuery({
    queryKey: ["donorsData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donors");
      return res.data;
    },
  });
  return { donorsData, donorsDataLoading };
};

export default useDonorsData;
