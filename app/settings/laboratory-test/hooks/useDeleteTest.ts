import { deleteTest } from "@/app/api/services/laboratorytest.api";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteTest = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useAppLoaderContext();

  const { mutate: deleteTestMutation, isPending } = useMutation({
    mutationFn: (id: number) => deleteTest(id),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["laboratoryTest"] });
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
    deleteTest: deleteTestMutation,
    isPending,
  };
};

export default useDeleteTest;
