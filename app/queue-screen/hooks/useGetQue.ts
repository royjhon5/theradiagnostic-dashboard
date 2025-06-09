import { getOnQue } from "@/app/api/services/client.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetQue = () => {
  const queryClient = useQueryClient();
  const { refetch, data, isPending } = useQuery({
    queryKey: ["queuing"],
    queryFn: async () => {
      const response = await getOnQue();
      return response;
    },
  });

  return {
    isPending,
    fetechData: refetch,
    queData: data?.response ? data.response : [],
    refetchQue: () => queryClient.invalidateQueries({ queryKey: ["queuing"] }),
  };
};

export default useGetQue;
