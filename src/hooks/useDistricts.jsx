import { useQuery } from "@tanstack/react-query";

const useDistricts = (selectedDivision) => {
  const { data: districtsData, isPending: districtsDataLoading } = useQuery({
    queryKey: ["divisionsData", selectedDivision],
    enabled: selectedDivision.length > 0,
    queryFn: async () => {
      const response = await fetch(
        `https://bdapis.com/api/v1.1/division/${selectedDivision}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  });
  return { districtsData, districtsDataLoading };
};

export default useDistricts;
