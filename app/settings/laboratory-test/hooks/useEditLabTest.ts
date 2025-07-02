import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { globalLabTestData, LabTestUpdateSchema } from "../schema";
import { updateLabTestDTO } from "@/types/DTO/LaboratoryTest.dto";
import { updateLabTest } from "@/app/api/services/laboratorytest.api";

const useEditLabTest = () => {
  const router = useRouter();
  const { setLoading } = useAppLoaderContext();
  const form = useForm<updateLabTestDTO>({
    resolver: zodResolver(LabTestUpdateSchema),
    defaultValues: {
      id: 0,
      testName: "",
      testCategory: "",
      price: 0,
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateLabTest,
    onSuccess: (res) => {
      const data = res as BaseResponseType<boolean>;
      if (data.isSuccess) {
        toast.success("Test has been updated.");
        form.reset();
        router.push("/settings/laboratory-test");
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const onSubmit = ({ testName, testCategory, price }: globalLabTestData) => {
    setLoading(true);
    mutate({
      id: form.getValues("id"),
      testName,
      testCategory,
      price,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useEditLabTest;
