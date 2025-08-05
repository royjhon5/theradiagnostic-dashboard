import { getTotalSales } from "@/app/api/services/dashboard.api";
import { useQuery } from "@tanstack/react-query";

const useGetTotalSales = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["totalsales"],
    queryFn: async () => {
      const response = await getTotalSales();
      return response;
    },
  });

  return {
    isPending,
    refetchClient: refetch,
    totalsales: data?.response ?? [],
  };
};

export default useGetTotalSales;
