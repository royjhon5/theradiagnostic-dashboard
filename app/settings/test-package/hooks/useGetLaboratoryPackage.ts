import { getAllLabPackage } from "@/app/api/services/laboratorypackage.api";
import { useQuery } from "@tanstack/react-query";

const useGetLaboratoryPackage = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["laboratoryPackage"],
    queryFn: async () => {
      const response = await getAllLabPackage();
      return response;
    },
  });

  return {
    refetchData: refetch,
    isPending,
    laboratoryPackage: data?.response ? data.response : [],
  };
};

export default useGetLaboratoryPackage;
