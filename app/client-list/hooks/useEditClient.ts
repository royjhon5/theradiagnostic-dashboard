import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { UpdateClientDto } from "@/types/DTO/Client.dto";
import { globalUpdateClientData, updateClientSchema } from "../schema";
import { updateClient } from "@/app/api/services/client.api";

const useEditClient = () => {
  const router = useRouter();
  const { setLoading } = useAppLoaderContext();
  const form = useForm<UpdateClientDto>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {
      id: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      age: "",
      gender: "",
      contactNumber: "",
      civilStatus: "",
      isPriority: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateClient,
    onSuccess: (res) => {
      const data = res as BaseResponseType<boolean>;
      if (data.isSuccess) {
        toast.success("Client has been updated.");
        form.reset();
        router.push("/client-list");
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const onSubmit = ({
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    age,
    gender,
    address,
    contactNumber,
    civilStatus,
    isPriority,
  }: globalUpdateClientData) => {
    setLoading(true);
    mutate({
      id: form.getValues("id"),
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      age,
      gender,
      address,
      contactNumber,
      civilStatus,
      isPriority,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useEditClient;
