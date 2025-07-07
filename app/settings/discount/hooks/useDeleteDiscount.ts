import { deleteDiscount } from "@/app/api/services/discount.api";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteDiscount = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useAppLoaderContext();

  const { mutate: deleteDiscountMutation, isPending } = useMutation({
    mutationFn: (id: number) => deleteDiscount(id),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discount"] });
      toast.success("Discount deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting employer");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  return {
    deleteDiscount: deleteDiscountMutation,
    isPending,
  };
};

export default useDeleteDiscount;
