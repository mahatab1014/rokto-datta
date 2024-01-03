import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePostsData = (postTypeParam, page, rowsPerPage) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: postsData,
    isPending: postsDataLoading,
    refetch: postsDataRefetch,
  } = useQuery({
    queryKey: ["postsData", postTypeParam, page, rowsPerPage],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/posts?postType=${postTypeParam}&page=${page}&size=${rowsPerPage}`
      );

      return response.data;
    },
  });
  return { postsData, postsDataRefetch, postsDataLoading };
};

export default usePostsData;
