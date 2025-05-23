import { getAllEmployers } from "@/app/api/services/employers.api";
import { useQuery } from "@tanstack/react-query";

const useEmployer = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["employer_data"],
    queryFn: async () => {
      const response = await getAllEmployers();
      return response;
    },
  });

  const employers = data?.response ?? [];

  const industries = Array.from(
    new Map(
      employers
        .filter((e) => e.industry)
        .map((e) => [e.industry, { label: e.industry, value: e.industry }])
    ).values()
  );

  const SelectOptions = Array.from(
    new Map(
      employers
        .filter((e) => e.nameOfEmplyeer && e.id != null)
        .map((e) => [
          e.id,
          {
            label: e.nameOfEmplyeer,
            value: Number(e.id),
          },
        ])
    ).values()
  );

  const mappedEmployers =
    data?.response?.map((employer) => ({
      id: employer.id,
      name: employer.nameOfEmplyeer,
    })) || [];

  return {
    isPending,
    refetchData: refetch,
    employer: data?.response ? data.response : [],
    industries,
    SelectOptions,
    employerdata: mappedEmployers,
  };
};

export default useEmployer;
