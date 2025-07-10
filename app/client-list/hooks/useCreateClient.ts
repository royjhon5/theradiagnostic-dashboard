"use client";

import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/app/api/services/client.api";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import useClient from "./useClient";
import { CreateClientDto } from "@/types/DTO/Client.dto";

const useCreateClient = () => {
  const { refetchClient } = useClient();
  const { setLoading } = useAppLoaderContext();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createClient,
    onSuccess: (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("Client Successfully Created.");
        refetchClient();
        router.push(`/client-registration/services?clientId=${data.response}`);
      }
      setLoading(false);
    },
    onError: (res) => {
      setLoading(false);
      toast.error(`${res.message}`);
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

export default useCreateClient;
