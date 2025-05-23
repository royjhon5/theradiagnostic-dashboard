"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, globalClientData } from "../schema";
import useClient from "./useClient";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/app/api/services/client.api";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { CreateClientDto } from "@/types/DTO/Client.dto";

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
      currentAddress: "",
      province: "",
      barangay: "",
      seniorCitizen: "",
      validId: "",
      validIdNo: "",
      activePhoneNumber: "",
      activeEmail: "",
      medicalHistory: "",
      currentMedication: "",
      knownAllergies: "",
      insuranceInfo: "",
      appointmentDate: "",
      appointmentType: "",
      employersId: "",
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
        router.push(`/appointment/services?clientId=${data.response}`);
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
    currentAddress,
    province,
    barangay,
    seniorCitizen,
    validId,
    validIdNo,
    activePhoneNumber,
    activeEmail,
    medicalHistory,
    currentMedication,
    knownAllergies,
    insuranceInfo,
    appointmentDate,
    appointmentType,
    employersId,
  }: globalClientData) => {
    setLoading(true);
    mutate({
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      age,
      gender,
      currentAddress,
      province,
      barangay,
      seniorCitizen,
      validId,
      validIdNo,
      activePhoneNumber,
      activeEmail,
      medicalHistory,
      currentMedication,
      knownAllergies,
      insuranceInfo,
      appointmentDate,
      appointmentType,
      employersId,
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
