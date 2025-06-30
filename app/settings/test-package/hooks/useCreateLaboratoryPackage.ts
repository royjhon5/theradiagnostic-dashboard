import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { CreatePackageDto } from "@/types/DTO/LaboratoryPackage.dto";
import { useForm } from "react-hook-form";
import { globalLabPackageData, LabPackageSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createLaboratoryPackage } from "@/app/api/services/laboratorypackage.api";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";

const useCreateLaboratoryPackage = () => {
  const { setLoading } = useAppLoaderContext();

  const form = useForm<CreatePackageDto>({
    resolver: zodResolver(LabPackageSchema),
    defaultValues: {
      packageName: "",
      packages: [],
      totalPrice: 0,
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createLaboratoryPackage,
    onSuccess: (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("Laboratory Package Successfully Created.");
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
    packageName,
    packages,
    totalPrice,
  }: globalLabPackageData) => {
    setLoading(true);
    mutate({
      packageName,
      packages,
      totalPrice,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useCreateLaboratoryPackage;
