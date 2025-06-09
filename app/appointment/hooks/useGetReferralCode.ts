'use client";';
import { getReferralCode } from "@/app/api/services/client.api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useGetReferralCode = (code: string) => {
  const [isPending, setIsLoading] = useState(false);
  const { refetch, data } = useQuery({
    queryKey: ["referralcode", code],
    queryFn: async () => {
      const response = await getReferralCode(code);
      return response;
    },
    enabled: false,
  });

  const refetchData = async () => {
    try {
      setIsLoading(true);
      const result = await refetch();
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isPending,
    refetchData,
    checkreferral: data?.response ?? [],
    referralData: data?.message,
  };
};

export default useGetReferralCode;
