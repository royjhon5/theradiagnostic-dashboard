import { getAllDiscount } from "@/app/api/services/discount.api";
import { useQuery } from "@tanstack/react-query";

const useGetDiscount = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["discount"],
    queryFn: async () => {
      const response = await getAllDiscount();
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
    discountData: data?.response ? data.response : [],
  };
};

export default useGetDiscount;
