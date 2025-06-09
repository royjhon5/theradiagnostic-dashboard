import { getLaboratoryPackageById } from "@/app/api/services/laboratorypackage.api";
import { useQuery } from "@tanstack/react-query";

const useGetPackageById = (id: number) => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["labpackagebyid", id],
    queryFn: async () => {
      const response = await getLaboratoryPackageById(id);
      return response;
    },
  });

  return {
    refetch,
    isPending,
    PackageData: data?.response ?? [],
    PackageMessage: data?.message,
  };
};

export default useGetPackageById;
