import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ProcessClientResult } from "@/app/api/services/client.api";
import { AppSocket } from "@/lib/socketClient";

const useMarkAsDone = () => {
  const { setLoading } = useAppLoaderContext();
  const socket = AppSocket();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (variables: { id: number; status: string }) =>
      ProcessClientResult(variables, variables.id),
    onSuccess: (res) => {
      const data = res as BaseResponseType<boolean>;
      if (data.isSuccess) {
        socket?.emit("SendToClientForEvaluation");
        socket?.emit("SendToClientResultEntry");
        toast.success("Client for evaluation");
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
      status: "FOR EVALUATION",
    });
  };

  return {
    submitData,
    isPending,
    isSuccess,
  };
};

export default useMarkAsDone;
