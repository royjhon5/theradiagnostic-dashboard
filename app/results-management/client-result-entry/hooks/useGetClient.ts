import { getClientByStatus } from "@/app/api/services/client.api";
import { useQuery } from "@tanstack/react-query";

const useGetClient = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["clientdata"],
    queryFn: async () => {
      const response = await getClientByStatus();
      return response;
    },
  });

  return {
    refetchData: refetch,
    isPending,
    clientDataByStatus: data?.response ? data.response : [],
  };
};

export default useGetClient;
