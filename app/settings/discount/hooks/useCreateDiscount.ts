import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { DiscountSchema, globalDiscountData } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { CreateDiscountDto } from "@/types/DTO/Discount..dto";
import { createDiscount } from "@/app/api/services/discount.api";

const useCreateDiscount = () => {
  const { setLoading } = useAppLoaderContext();
  const form = useForm<CreateDiscountDto>({
    resolver: zodResolver(DiscountSchema),
    defaultValues: {
      discountDescription: "",
      discountAmount: 0,
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createDiscount,
    onSuccess: (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("Discount Successfully Created.");
        form.reset();
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const onSubmit = ({
    discountDescription,
    discountAmount,
  }: globalDiscountData) => {
    setLoading(true);
    mutate({
      discountDescription,
      discountAmount,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useCreateDiscount;
