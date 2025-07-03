"use client";

import { userSignIn } from "@/app/api/services/user.api";
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
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<globalLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: userSignIn,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async (res) => {
      const data = res as BaseResponseType<LoginResponseDto>;
      if (data && data.isSuccess) {
        const { firstName, lastName } = data.response;
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
        toast.success("User has been logged in successfully.");
        router.push("/dashboard");
      } else {
        toast.error("Error: Unauthorized User");
      }
    },
    onError: () => {
      toast.error("Error: Unauthorized User");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = ({ username, password }: globalLoginSchema) => {
    setLoading(true);
    mutate({
      username,
      password,
    });
  };

  return {
    onSubmit,
    isPending,
    form,
    loading,
  };
};

export default useSignIn;
