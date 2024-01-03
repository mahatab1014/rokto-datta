import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePostsCount = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: postsCountData,
    isPending: postsCountDataLoading,
    refetch: postsCountDataRefetch,
  } = useQuery({
    queryKey: ["postsData"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/posts-count`);
      return response.data;
    },
  });
  return { postsCountData, postsCountDataLoading, postsCountDataRefetch };
};

export default usePostsCount;
