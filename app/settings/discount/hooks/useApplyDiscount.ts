import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { applyDiscount } from "@/app/api/services/discount.api";

const useApplyDiscount = () => {
  const { setLoading } = useAppLoaderContext();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: applyDiscount,
    onSuccess: (res: { message: string }) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["getcart"] });
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const submitDiscount = (clientId: number, discountId: number) => {
    setLoading(true);
    mutate({
      clientId,
      discountId,
      applyDiscount: true,
    });
  };

  return {
    submitDiscount,
    isPending,
    isSuccess,
  };
};

export default useApplyDiscount;
