import { getClientById } from "@/app/api/services/client.api";
import { useQuery } from "@tanstack/react-query";

const useGetClientById = (clientId: number) => {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["client-details", clientId],
    queryFn: async () => {
      const response = await getClientById(clientId);
      return response;
    },
  });

  return {
    clientDetails: data?.response || null,
    isSuccess: data?.isSuccess || false,
    error,
    isLoading,
    refetchGetClientDetails: refetch,
    clientData: data?.response ?? [],
  };
};

export default useGetClientById;
