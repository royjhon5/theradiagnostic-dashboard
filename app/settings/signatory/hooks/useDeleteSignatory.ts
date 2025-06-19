import { deleteSignatory } from "@/app/api/services/signatory.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteSignatory = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteSignatoyMutation, isPending } = useMutation({
    mutationFn: (id: number) => deleteSignatory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signatory"] });
      toast.success("Signatory deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting employer");
    },
  });
  return {
    deleteSignatory: deleteSignatoyMutation,
    isPending,
  };
};

export default useDeleteSignatory;
