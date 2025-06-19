import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { CreateSignatoryDTO } from "@/types/DTO/Signatory.dto";
import { globalSignatoryData, SignatorySchema } from "../schema";
import { createSignatory } from "@/app/api/services/signatory.api";

const useCreateSignatory = () => {
  const { setLoading } = useAppLoaderContext();

  const form = useForm<CreateSignatoryDTO>({
    resolver: zodResolver(SignatorySchema),
    defaultValues: {
      signatoryName: "",
      signatoryPosition: "",
      signatureImage: "",
      licenseNumber: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createSignatory,
    onSuccess: (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("Signatory Successfully Created.");
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
    signatoryName,
    signatoryPosition,
    signatureImage,
    licenseNumber,
  }: globalSignatoryData) => {
    setLoading(true);
    mutate({
      signatoryName,
      signatoryPosition,
      signatureImage,
      licenseNumber,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useCreateSignatory;
