import { getAllReleased } from "@/app/api/services/laboratoryresult.api";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const useGetReleased = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["client-for-review"],
    queryFn: async () => {
      const response = await getAllReleased();
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
    releasedData: data?.response ?? [],
  };
};

export default useGetReleased;
