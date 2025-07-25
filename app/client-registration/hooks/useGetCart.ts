import { getCart } from "@/app/api/services/cart.api";
import { useQuery } from "@tanstack/react-query";

const useGetCart = (id: number) => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["getcart", id],
    queryFn: async () => {
      const response = await getCart(id);
      return response;
    },
  });

    const cartItems = data?.response ?? [];
    const testNameMergeOnly = cartItems.flatMap(
      (item) => item.testNameMerge || []
    );

  return {
    isPending,
    refetchData: refetch,
    cartdata: data?.response ? data.response : [],
    totalAmount: data?.total ?? 0,
    testNameMergeOnly,
  };
};

export default useGetCart;
