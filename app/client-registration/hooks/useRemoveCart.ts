import { removeCart } from "@/app/api/services/cart.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useRemoveCart = () => {
  const queryClient = useQueryClient();
  const { mutate: removeCartMutation, isPending } = useMutation({
    mutationFn: (id: number) => removeCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getcart"] });
      toast.success("Service removed.");
    },
    onError: () => {
      toast.error("Error deleting employer");
    },
  });
  return {
    removeCart: removeCartMutation,
    isPending,
  };
};

export default useRemoveCart;
