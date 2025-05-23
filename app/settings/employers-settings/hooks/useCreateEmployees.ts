import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { CreateEmployeesDTO } from "@/types/DTO/Employees.dto";
import { useForm } from "react-hook-form";
import { CreateEmployeesData, createEmployeesSchema } from "../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployees } from "@/app/api/services/employees.api";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const useCreateEmployees = () => {
  const { setLoading } = useAppLoaderContext();
  const form = useForm<CreateEmployeesDTO>({
    resolver: zodResolver(createEmployeesSchema),
    defaultValues: {
      employersId: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      age: "",
      gender: "",
      currentAddress: "",
      province: "",
      barangay: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createEmployees,
    onSuccess: (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("New Employee has been saved.");
        form.reset();
      }
      setLoading(false);
    },
    onError: (err) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const onSubmit = ({
    employersId,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    age,
    gender,
    currentAddress,
    province,
    barangay,
  }: CreateEmployeesData) => {
    setLoading(true);
    mutate({
      employersId,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      age,
      gender,
      currentAddress,
      province,
      barangay,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useCreateEmployees;
