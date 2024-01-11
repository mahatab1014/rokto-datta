import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = (uid) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: userRole,
    isPending: userRoleLoading,
    refetch: userRoleRefetch,
  } = useQuery({
    queryKey: ["userRole", uid],
    queryFn: async () => {
      const response = await axiosSecure.get(`/role?uid=${uid}`);
      return response.data;
    },
  });
  return { userRole, userRoleLoading, userRoleRefetch };
};

export default useRole;
