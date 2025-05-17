import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { globalUserData, userScheme } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { userSignUp } from "@/app/api/services/user.api";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";

const useCreateUser = () => {
  const { setLoading } = useAppLoaderContext();
  const form = useForm<globalUserData>({
    resolver: zodResolver(userScheme),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      passwordHash: "",
      roleId: "",
      address: "",
      phoneNumber: "",
      canPerformUserManagment: 0,
      canPerformClientAppointments: 0,
      canViewReports: 0,
      canAddLaboratoryPackages: 0,
      canPerformLaboratoryRequest: 0,
      additonalNotes: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: userSignUp,
    onSuccess: (res) => {
      const data = res as BaseResponseType<string[]>;
      if (data.isSuccess) {
        toast.success("New user has been saved. Successfully!");
        form.reset();
      }
      setLoading(false);
    },
    onError: (res) => {
      setLoading(false);
      toast.error(`${res.message}`);
    },
  });

  const onSubmit = ({
    email,
    firstName,
    lastName,
    userName,
    passwordHash,
    roleId,
    address,
    phoneNumber,
    canPerformUserManagment,
    canPerformClientAppointments,
    canViewReports,
    canAddLaboratoryPackages,
    canPerformLaboratoryRequest,
    additonalNotes,
  }: globalUserData) => {
    setLoading(true);
    mutate({
      email,
      firstName,
      lastName,
      userName,
      passwordHash,
      roleId,
      address,
      phoneNumber,
      canPerformUserManagment,
      canPerformClientAppointments,
      canViewReports,
      canAddLaboratoryPackages,
      canPerformLaboratoryRequest,
      additonalNotes,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useCreateUser;
