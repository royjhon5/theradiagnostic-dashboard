import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { globalUserData, userScheme } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { userSignUp } from "@/app/api/services/user.api";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { UserSignUpDto } from "@/types/DTO/UserDTO";

const useCreateUser = () => {
  const { setLoading } = useAppLoaderContext();
  const form = useForm<UserSignUpDto>({
    resolver: zodResolver(userScheme),
    defaultValues: {
      email: "",
      firstName: "",
      middleInitial: "",
      lastName: "",
      professionalTitle: "",
      userName: "",
      passwordHash: "",
      roleId: "",
      address: "",
      phoneNumber: "",
      licenseNumber: "",
      signature: "",
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
    middleInitial,
    lastName,
    professionalTitle,
    userName,
    passwordHash,
    roleId,
    address,
    phoneNumber,
    licenseNumber,
    signature,
  }: globalUserData) => {
    setLoading(true);
    mutate({
      email,
      firstName,
      middleInitial,
      lastName,
      professionalTitle,
      userName,
      passwordHash,
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

export default useCreateUser;
