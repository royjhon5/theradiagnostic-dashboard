import { getCountNowServing } from "@/app/api/services/client.api";
import { useQuery } from "@tanstack/react-query";

const useGetCountNowServing = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["countnowserving"],
    queryFn: async () => {
      const response = await getCountNowServing();
      return response;
    },
  });

  return {
    isPending,
    data,
    fetechData: refetch,
    servingData: data?.response ? data.response : [],
    countData: data?.totalCount ?? 0,
  };
};

export default useGetCountNowServing;
