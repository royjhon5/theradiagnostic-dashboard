import { getAllEmployeesTotal } from "@/app/api/services/dashboard.api";
import { useQuery } from "@tanstack/react-query";

const useGetTotalEmployee = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["totalemployee"],
    queryFn: async () => {
      const response = await getAllEmployeesTotal();
      return response;
    },
  });

  return {
    isPending,
    refetchClient: refetch,
    totalemployee: data?.response ?? [],
  };
};

export default useGetTotalEmployee;
