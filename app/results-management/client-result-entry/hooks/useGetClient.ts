import { getClientByStatus } from "@/app/api/services/client.api";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const useGetClient = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["clientdata"],
    queryFn: async () => {
      const response = await getClientByStatus();
      return response;
    },
  });

  const refetchData = useCallback(() => {
    return refetch();
  }, [refetch]);

  return {
    refetchData,
    isPending,
    clientDataByStatus: data?.response ? data.response : [],
    countResultEnry: data?.totalCount,
  };
};

export default useGetClient;
