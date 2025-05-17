import { getUserRoles } from "@/app/api/services/user.api";
import { useQuery } from "@tanstack/react-query";

type Role = {
  id: string;
  name: string;
};

const useUserRoles = () => {
  const { data = [], isFetching } = useQuery<Role[]>({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const response = await getUserRoles();
      return response;
    },
  });

  const selectOptions = data.map((role) => ({
    label: role.name,
    value: role.id,
  }));

  return {
    isFetching,
    selectOptions,
  };
};

export default useUserRoles;
