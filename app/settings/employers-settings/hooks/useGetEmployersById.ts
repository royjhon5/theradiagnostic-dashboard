import { getEmployersById } from "@/app/api/services/employers.api";
import { useQuery } from "@tanstack/react-query";

const useGetEmployersById = (id: number) => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["employers-details", id],
    queryFn: async () => {
      const response = await getEmployersById(id);
      return response;
    },
  });

  const mappedEmployers =
    data?.response?.map((items) => ({
      id: items.employeeId,
      name: items.firstName,
    })) || [];

  return {
    isPending,
    refetchData: refetch,
    employer: data?.response ? data.response : [],
    employersData: data?.response ? data.response : [],
    resultdata: mappedEmployers,
  };
};

export default useGetEmployersById;
