import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePostsData = (postTypeParam) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: postsData,
    isPending: postsDataLoading,
    refetch: postsDataRefetch,
  } = useQuery({
    queryKey: ["postsData", postTypeParam],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/posts?postType=${postTypeParam}`
      );

      return response.data;
    },
  });
  return { postsData, postsDataRefetch, postsDataLoading };
};

export default usePostsData;
