import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCommentsData = (id) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: commentsData,
    isPending: commentsDataLoading,
    refetch: commentsDataRefetch,
  } = useQuery({
    queryKey: ["commentsData", id],
    enabled: id.length > 0,
    queryFn: async () => {
      const response = await axiosPublic.get(`/comments/${id}`);
      return response.data;
    },
  });
  return { commentsData, commentsDataLoading, commentsDataRefetch };
};

export default useCommentsData;
