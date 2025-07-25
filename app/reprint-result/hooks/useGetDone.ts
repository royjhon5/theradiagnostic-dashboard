import { getDone } from "@/app/api/services/laboratoryresult.api";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const useGetDone = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["client-for-done"],
    queryFn: async () => {
      const response = await getDone();
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

export default useGetDone;
