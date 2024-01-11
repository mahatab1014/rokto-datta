import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useUserInfo = (uid) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: userInfo,
    isPending: userInfoLoading,
    refetch: userInfoRefetch,
  } = useQuery({
    queryKey: ["userInfo", uid],
    queryFn: async () => {
      const response = await axiosSecure.get(`/user-info?uid=${uid}`);
      return response.data;
    },
  });
  return { userInfo, userInfoLoading, userInfoRefetch };
};

export default useUserInfo;
