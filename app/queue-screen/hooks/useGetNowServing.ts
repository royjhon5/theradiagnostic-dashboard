import { getNowServing } from "@/app/api/services/client.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetNowServing = () => {
  const queryClient = useQueryClient();
  const { refetch, data, isPending } = useQuery({
    queryKey: ["nowserving"],
    queryFn: async () => {
      const response = await getNowServing();
      return response;
    },
  });

  return {
    isPending,
    data,
    fetechData: refetch,
    nowservingData: data?.response ? data.response : [],
    refetchServing: () =>
      queryClient.invalidateQueries({ queryKey: ["nowserving"] }),
  };
};

export default useGetNowServing;
