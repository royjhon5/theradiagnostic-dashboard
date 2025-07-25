import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ProcessClientResult } from "@/app/api/services/client.api";
import { AppSocket } from "@/lib/socketClient";

const useForAuthorization = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useAppLoaderContext();
  const socket = AppSocket();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (variables: { id: number; status: string }) =>
      ProcessClientResult(variables, variables.id),
    onSuccess: (res) => {
      const data = res as BaseResponseType<boolean>;
      if (data.isSuccess) {
        socket?.emit("SendToClientForEvaluation");
        toast.success(
          "Client result has been release awaiting for authorization"
        );
        queryClient.invalidateQueries({ queryKey: ["client-for-review"] });
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });
  const submitData = (id?: number) => {
    if (!id) {
      toast.error("Client ID is missing.");
      return;
    }
    setLoading(true);
    mutate({
      id,
      status: "DONE",
    });
  };

  return {
    submitData,
    isPending,
    isSuccess,
  };
};

export default useForAuthorization;
