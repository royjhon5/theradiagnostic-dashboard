import { getCountNowServing } from "@/app/api/services/client.api";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const useGetCountNowServing = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["countnowserving"],
    queryFn: async () => {
      const response = await getCountNowServing();
      return response;
    },
  });

  const fetchData = useCallback(() => {
    return refetch();
  }, [refetch]);

  return {
    isPending,
    data,
    fetchData,
    servingData: data?.response ?? [],
    countData: data?.totalCount ?? 0,
  };
};

export default useGetCountNowServing;
