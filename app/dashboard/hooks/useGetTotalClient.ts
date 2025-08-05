import { getAllClientTotal } from "@/app/api/services/dashboard.api";
import { useQuery } from "@tanstack/react-query";

const useGetallClient = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["totalclient"],
    queryFn: async () => {
      const response = await getAllClientTotal();
      return response;
    },
  });

  return {
    isPending,
    refetchClient: refetch,
    totalclient: data?.response ?? [],
  };
};

export default useGetallClient;
