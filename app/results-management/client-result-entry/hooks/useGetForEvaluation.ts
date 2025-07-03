import { getForEvaluation } from "@/app/api/services/client.api";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const useGetForEvaluation = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["clientevaluation"],
    queryFn: async () => {
      const response = await getForEvaluation();
      return response;
    },
  });

  const refetchData = useCallback(() => {
    return refetch();
  }, [refetch]);

  return {
    refetchEvaluatedData: refetchData,
    isPending,
    clientDataByStatus: data?.response ? data.response : [],
    countEvalation: data?.totalCount,
  };
};

export default useGetForEvaluation;
