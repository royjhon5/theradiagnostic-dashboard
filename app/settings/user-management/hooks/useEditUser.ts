import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/api/services/user.api";
import { UserUpdateDto } from "@/types/DTO/UserDTO";
import { globalUpdateUserData, updateUserSchema } from "../schema";

const useEditUser = () => {
  const router = useRouter();
  const { setLoading } = useAppLoaderContext();
  const form = useForm<UserUpdateDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: "",
      email: "",
      firstName: "",
      middleInitial: "",
      lastName: "",
      professionalTitle: "",
      userName: "",
      roleId: "",
      address: "",
      phoneNumber: "",
      licenseNumber: "",
      signature: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateUser,
    onSuccess: (res) => {
      const data = res as BaseResponseType<boolean>;
      if (data.isSuccess) {
        toast.success("User has been updated.");
        form.reset();
        router.push("/settings/user-management");
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const onSubmit = ({
    email,
    firstName,
    middleInitial,
    lastName,
    professionalTitle,
    userName,
    roleId,
    address,
    phoneNumber,
    licenseNumber,
    signature,
  }: globalUpdateUserData) => {
    setLoading(true);
    mutate({
      id: form.getValues("id"),
      email,
      firstName,
      middleInitial,
      lastName,
      professionalTitle,
      userName,
      roleId,
      address,
      phoneNumber,
      licenseNumber,
      signature,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useEditUser;
