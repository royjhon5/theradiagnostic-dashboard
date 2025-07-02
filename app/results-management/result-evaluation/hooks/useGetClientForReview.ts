import { getAllClientResult } from "@/app/api/services/laboratoryresult.api";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const useGetClientForReview = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["client-for-review"],
    queryFn: async () => {
      const response = await getAllClientResult();
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
    clientForReviewData: data?.response ?? [],
  };
};

export default useGetClientForReview;
