import { deletePackage } from "@/app/api/services/laboratorypackage.api";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeletePackage = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useAppLoaderContext();

  const { mutate: deleteTestMutation, isPending } = useMutation({
    mutationFn: (id: number) => deletePackage(id),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["laboratoryPackage"] });
      toast.success("Test deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting employer");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  return {
    deletePackage: deleteTestMutation,
    isPending,
  };
};

export default useDeletePackage;
