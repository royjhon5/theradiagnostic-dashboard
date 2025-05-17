import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useForm } from "react-hook-form";
import { globalLabTestData, LabTestSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseType } from "@/types/BaseResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { CreateLaboratoryTestDto } from "@/types/DTO/LaboratoryTest.dto";
import { createLaboratoryTest } from "@/app/api/services/laboratorytest.api";

const useCreateLaboratoryTest = () => {
  const { setLoading } = useAppLoaderContext();

  const form = useForm<CreateLaboratoryTestDto>({
    resolver: zodResolver(LabTestSchema),
    defaultValues: {
      testName: "",
      testCategory: "",
      price: "",
      description: "",
      additionalNotes: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createLaboratoryTest,
    onSuccess: (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("Laboratory Test Successfully Created.");
        form.reset();
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const onSubmit = ({
    testName,
    testCategory,
    price,
    description,
    additionalNotes,
  }: globalLabTestData) => {
    setLoading(true);
    mutate({
      testName,
      testCategory,
      price,
      description,
      additionalNotes,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    isSuccess,
  };
};

export default useCreateLaboratoryTest;
