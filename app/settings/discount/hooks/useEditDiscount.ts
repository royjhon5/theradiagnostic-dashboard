import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { DiscountUpdateSchema, globalUpdateDiscountData } from "../schema";
import { UpdateDiscountDto } from "@/types/DTO/Discount..dto";
import { updateDiscount } from "@/app/api/services/discount.api";

const useEditDiscount = () => {
  const router = useRouter();
  const { setLoading } = useAppLoaderContext();
  const form = useForm<UpdateDiscountDto>({
    resolver: zodResolver(DiscountUpdateSchema),
    defaultValues: {
      id: 0,
      discountDescription: "",
      discountAmount: 0,
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateDiscount,
    onSuccess: (res) => {
      const data = res as BaseResponseType<boolean>;
      if (data.isSuccess) {
        toast.success("Discount has been updated.");
        form.reset();
        router.push("/settings/discount");
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
  }: globalUpdateDiscountData) => {
    setLoading(true);
    mutate({
      id: form.getValues("id"),
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

export default useEditDiscount;
