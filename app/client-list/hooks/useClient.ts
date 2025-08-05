import { getAllClient } from "@/app/api/services/client.api";
import { useQuery } from "@tanstack/react-query";

const useClient = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["client"],
    queryFn: async () => {
      const response = await getAllClient();
      return response;
    },
  });

  const clientOptions = data?.response.map((prop) => {
    return {
      text: prop.firstName,
      value: prop.id,
    };
  });

  return {
    isPending,
    refetchClient: refetch,
    clients: data?.response ? data.response : [],
    clientdata: data?.response ?? [],
    options: clientOptions ? clientOptions : [],
  };
};

export default useClient;
