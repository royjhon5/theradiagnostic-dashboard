import { getAllLabTest } from "@/app/api/services/laboratorytest.api";
import { useQuery } from "@tanstack/react-query";

const useGetLaboratoryTest = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["laboratoryTest"],
    queryFn: async () => {
      const response = await getAllLabTest();
      const transformedData =
        response?.response?.map((item) => ({
          ...item,
          checked: false,
        })) || [];

      return {
        ...response,
        response: transformedData,
      };
    },
  });

  return {
    isPending,
    refetchClient: refetch,
    labtest: data?.response ? data.response : [],
  };
};

export default useGetLaboratoryTest;
