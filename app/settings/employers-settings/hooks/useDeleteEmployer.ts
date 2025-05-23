import { deleteEmployer } from "@/app/api/services/employers.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteEmployer = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteEmployerMutation, isPending } = useMutation({
    mutationFn: (id: number) => deleteEmployer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer_data"] });
      toast.success("Employer deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting employer");
    },
  });
  return {
    deleteEmployers: deleteEmployerMutation,
    isPending,
  };
};

export default useDeleteEmployer;
