"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/app/api/services/client.api";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { CreateClientDto } from "@/types/DTO/Client.dto";
import useClient from "./useClient";
import { clientSchema, globalClientData } from "../schema";

const useCreateClient = () => {
  const { refetchClient } = useClient();
  const { setLoading } = useAppLoaderContext();
  const router = useRouter();
  const form = useForm<CreateClientDto>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      age: "",
      gender: "",
      address: "",
      contactNumber: "",
      appointmentDate: "",
      appointmentType: "",
      employersId: "",
      civilStatus: "",
      isPriority: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createClient,
    onSuccess: (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("Client Successfully Created.");
        refetchClient();
        form.reset();
        router.push(`/client-registration/services?clientId=${data.response}`);
      }
      setLoading(false);
    },
    onError: (res) => {
      setLoading(false);
      toast.error(`${res.message}`);
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
    appointmentDate,
    appointmentType,
    employersId,
    civilStatus,
    isPriority,
  }: globalClientData) => {
    setLoading(true);
    mutate({
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      age,
      gender,
      address,
      contactNumber,
      appointmentDate,
      appointmentType,
      employersId,
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
export default useCreateClient;
