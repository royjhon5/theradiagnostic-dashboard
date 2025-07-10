import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { CreateClientDto } from "@/types/DTO/Client.dto";
import { updateClient } from "@/app/api/services/client.api";
import { useMainContext } from "../context/context-provider";

const useEditClient = () => {
  const router = useRouter();
  const { setLoading } = useAppLoaderContext();
  const { currentRow } = useMainContext();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateClient,
    onSuccess: (res) => {
      const data = res as BaseResponseType<boolean>;
      if (data.isSuccess) {
        toast.success("Client Successfully ReCreated.");
        router.push(`/client-registration/services?clientId=${currentRow?.id}`);
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const onSubmit = (formData: CreateClientDto) => {
    setLoading(true);
    mutate(formData);
  };

  return {
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useEditClient;
