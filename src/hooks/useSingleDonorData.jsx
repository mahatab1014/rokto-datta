import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSingleDonorData = (id) => {
  const axiosPublic = useAxiosPublic();
  const { data: singleDonorData, isPending: singleDonorDataLoading } = useQuery(
    {
      queryKey: ["singleDonorData", id],
      queryFn: async () => {
        const res = await axiosPublic.get(`/users?id=${id}`);
        return res.data;
      },
    }
  );
  return { singleDonorData, singleDonorDataLoading };
};

export default useSingleDonorData;
