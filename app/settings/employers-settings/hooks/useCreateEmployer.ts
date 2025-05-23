import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { CreateEmployersDTO } from "@/types/DTO/Employers.dto";
import { GlobalData, globalSchema } from "../schema/schema";
import { createEmployer } from "@/app/api/services/employers.api";

const useCreateEmployer = () => {
  const { setLoading } = useAppLoaderContext();
  const form = useForm<CreateEmployersDTO>({
    resolver: zodResolver(globalSchema),
    defaultValues: {
      nameOfEmplyeer: "",
      contactPerson: "",
      phoneNumber: "",
      emailAddress: "",
      establishmentAddress: "",
      industry: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createEmployer,
    onSuccess: (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("New Employer has been saved.");
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
    nameOfEmplyeer,
    contactPerson,
    phoneNumber,
    emailAddress,
    establishmentAddress,
    industry,
  }: GlobalData) => {
    setLoading(true);
    mutate({
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

export default useCreateEmployer;
