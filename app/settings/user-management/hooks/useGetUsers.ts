import { getAllUsers } from "@/app/api/services/user.api";
import { useQuery } from "@tanstack/react-query";

const useGetUsers = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const response = await getAllUsers();
      return response;
    },
  });

  return {
    refetchData: refetch,
    isPending,
    usersData: data?.response ? data.response : [],
  };
};

export default useGetUsers;
