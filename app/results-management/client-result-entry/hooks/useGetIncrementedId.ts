import { getIncrementedId } from "@/app/api/services/laboratoryresult.api";
import { useQuery } from "@tanstack/react-query";

const useGetIncrementedId = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["incrementedId"],
    queryFn: async () => {
      const response = await getIncrementedId();
      return response;
    },
  });

  return {
    refetchData: refetch,
    isPending,
    incrementedIdGet: data?.latestId,
  };
};

export default useGetIncrementedId;
