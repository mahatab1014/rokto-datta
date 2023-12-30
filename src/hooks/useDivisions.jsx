import { useQuery } from "@tanstack/react-query";

const useDivisions = () => {
  const { data: divisionsData, isPending: divisionsDataLoading } = useQuery({
    queryKey: ["divisionsData"],
    queryFn: async () => {
      const response = await fetch("https://bdapis.com/api/v1.1/divisions");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  });
  return { divisionsData, divisionsDataLoading };
};

export default useDivisions;
