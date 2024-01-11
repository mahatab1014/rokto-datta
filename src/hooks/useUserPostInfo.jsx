import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserPostInfo = (uid, page, size) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: userPostInfo,
    isPending: userPostInfoLoading,
    refetch: userPostInfoRefetch,
  } = useQuery({
    queryKey: ["userPostInfo", uid, page, size],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/user-post-info?uid=${uid}&page=${page}&size=${size}`
      );
      return res.data;
    },
  });
  return { userPostInfo, userPostInfoLoading, userPostInfoRefetch };
};

export default useUserPostInfo;
