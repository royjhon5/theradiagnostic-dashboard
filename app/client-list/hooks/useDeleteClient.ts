import { deleteClient } from "@/app/api/services/client.api";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useAppLoaderContext();

  const { mutate: deleteClientMutation, isPending } = useMutation({
    mutationFn: (id: number) => deleteClient(id),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] });
      toast.success("Client deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting employer");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  return {
    deleteClient: deleteClientMutation,
    isPending,
  };
};

export default useDeleteClient;
