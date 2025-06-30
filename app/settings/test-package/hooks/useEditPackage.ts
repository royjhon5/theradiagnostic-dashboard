import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { globalLabPackageData, UpdateLabPackageSchema } from "../schema";
import { UpdatePackageDto } from "@/types/DTO/LaboratoryPackage.dto";
import { updatePackage } from "@/app/api/services/laboratorypackage.api";

const useEditPackage = () => {
  const router = useRouter();
  const { setLoading } = useAppLoaderContext();
  const form = useForm<UpdatePackageDto>({
    resolver: zodResolver(UpdateLabPackageSchema),
    defaultValues: {
      id: 0,
      packageName: "",
      packages: [],
      totalPrice: 0,
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updatePackage,
    onSuccess: (res) => {
      const data = res as BaseResponseType<boolean>;
      if (data.isSuccess) {
        toast.success("Package has been updated.");
        form.reset();
        router.push("/settings/test-package");
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
      id: form.getValues("id"),
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

export default useEditPackage;
