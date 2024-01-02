import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSinglePostData = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: singlePostData,
    isPending: singlePostDataLoading,
    refetch: singlePostDataRefetch,
  } = useQuery({
    queryKey: ["singlePostData", id],
    queryFn: async () => {
      try {
        const response = await axiosPublic.get(`/post/${id}`);
        return response.data;
      } catch (error) {
        return error?.response?.data;
      }
    },
  });
  return { singlePostData, singlePostDataRefetch, singlePostDataLoading };
};

export default useSinglePostData;
