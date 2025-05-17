import { getClientById } from "@/app/api/services/client.api";
import { useQuery } from "@tanstack/react-query";

const useGetClientById = (clientId: string) => {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["client-details", clientId],
    queryFn: async () => {
      const response = await getClientById(clientId);
      return response;
    },
    enabled: !!clientId && clientId !== "",
  });

  return {
    clientDetails: data?.response || null,
    isSuccess: data?.isSuccess || false,
    error,
    isLoading,
    refetchGetClientDetails: refetch,
  };
};

export default useGetClientById;
