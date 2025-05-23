import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { UpdateEmployersDTO } from "@/types/DTO/Employers.dto";
import { GlobalData, updateEmployerSchema } from "../schema/schema";
import { updateEmployer } from "@/app/api/services/employers.api";
import { useRouter } from "next/navigation";

const useUpdateEmployer = () => {
  const router = useRouter();
  const { setLoading } = useAppLoaderContext();
  const form = useForm<UpdateEmployersDTO>({
    resolver: zodResolver(updateEmployerSchema),
    defaultValues: {
      id: 0,
      nameOfEmplyeer: "",
      contactPerson: "",
      phoneNumber: "",
      emailAddress: "",
      establishmentAddress: "",
      industry: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateEmployer,
    onSuccess: (res) => {
      const data = res as BaseResponseType<boolean>;
      if (data.isSuccess) {
        toast.success("Employer has been updated.");
        form.reset();
        router.push("/settings/employers-settings");
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const onSubmit = ({
    nameOfEmplyeer,
    contactPerson,
    phoneNumber,
    emailAddress,
    establishmentAddress,
    industry,
  }: GlobalData) => {
    setLoading(true);
    mutate({
      id: form.getValues("id"),
      nameOfEmplyeer,
      contactPerson,
      phoneNumber,
      emailAddress,
      establishmentAddress,
      industry,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useUpdateEmployer;
