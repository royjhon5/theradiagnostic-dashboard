import { getAllSignatory } from "@/app/api/services/signatory.api";
import { useQuery } from "@tanstack/react-query";

const useGetSignatory = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["signatory"],
    queryFn: async () => {
      const response = await getAllSignatory();
      return response;
    },
  });

  const signatorydata = data?.response ?? [];

  const signatoryPositionData = Array.from(
    new Map(
      signatorydata
        .filter((e) => e.signatoryPosition)
        .map((e) => [
          e.signatoryPosition,
          { label: e.signatoryPosition, value: e.signatoryPosition },
        ])
    ).values()
  );

  return {
    refetch,
    isPending,
    signatoryPositionData,
    signatoryData: data?.response ?? [],
  };
};

export default useGetSignatory;
