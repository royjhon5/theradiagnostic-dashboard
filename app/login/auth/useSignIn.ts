"use client";

import { userSignIn } from "@/app/api/services/user.api";
import { setCurrentUser } from "@/app/store/user/userSlice";
import { useAppDispatch } from "@/hooks";
import { BaseResponseType } from "@/types/BaseResponse";
import { LoginResponseDto } from "@/types/DTO/UserDTO";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { globalLoginSchema, loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useState } from "react";

const useSignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setLoadings] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<globalLoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const mutation = useMutation({
    mutationFn: userSignIn,
    onSuccess: async (res) => {
      const data = res as BaseResponseType<LoginResponseDto>;
      if (data && data.isSuccess) {
        const { firstName, lastName, email, phoneNumber } = data.response;
        Cookies.set("userid", data.response.userId, { expires: 1 });
        Cookies.set("token", data.response.token, { expires: 1 });
        Cookies.set(
          "user",
          JSON.stringify({
            username: `${firstName} ${lastName}`,
            role: data.response.roles[0],
            email: data.response.email,
          }),
          { expires: 1 }
        );
        dispatch(
          setCurrentUser({
            name: `${firstName} ${lastName}`,
            email,
            phoneNumber,
            id: data.response.userId,
            isAuthenticated: true,
            roles: data.response.roles,
          })
        );
        toast.success("User has been logged in successfully.");
        router.push("/dashboard");
      } else {
        toast.error("Error: Unauthorized User");
      }
      setLoadings(false);
    },
    onError: () => {
      toast.error("Error: Unauthorized User");
      setLoadings(false);
    },
  });

  const onSubmit = ({ username, password }: globalLoginSchema) => {
    setLoadings(true);
    mutation.mutate({
      username,
      password,
    });
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    isLoading,
    errors,
  };
};

export default useSignIn;
