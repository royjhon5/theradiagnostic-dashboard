import { createLaboratoryImmunology } from "@/app/api/services/laboratoryresult.api";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BaseResponseType } from "@/types/BaseResponse";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useMainContext } from "../../context/context-provider";
import Cookies from "js-cookie";

export default function ImmunologyComponent() {
  const { currentRow } = useMainContext();
  const [TSHResult, setTSHResult] = useState("");
  const [TSHUnit, setTSHUnit] = useState("uIU/mL");
  const [TSHRange, setTSHRange] = useState("0.27 ~ 4.20");

  const [FTFourResult, setFTFourResult] = useState("");
  const [FTFourUnit, setFTFourUnit] = useState("pmol/L");
  const [FTFourRange, setFTFourRange] = useState("12.00 ~ 22.00");

  const { setLoading } = useAppLoaderContext();
  const { mutate } = useMutation({
    mutationFn: createLaboratoryImmunology,
    onSuccess: async (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("Result has been saved.");
      }
      setLoading(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error(`${err.message}`);
    },
  });

  const onSubmit = () => {
    if (!currentRow?.id) {
      toast.error("Missing client or package ID.");
      return;
    }
    setLoading(true);
    mutate({
      userId: Cookies.get("userid") || "",
      clientId: currentRow?.id,
      immunology: {
        tshResult: TSHResult,
        tshUnit: TSHUnit,
        tshRange: TSHRange,
        ftFourResult: FTFourResult,
        ftFourUnit: FTFourUnit,
        ftFourRange: FTFourRange,
      },
    });
  };

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <h2 className="font-bold">TEST</h2>
        <h2 className="text-center font-bold">Result</h2>
        <h2 className="text-center font-bold">Unit</h2>
        <h2 className="text-center font-bold">Reference Range</h2>
        <div className="col-span-4 mt-2">
          <Separator />
        </div>
        <div className="col-span-4 mt-2">
          <h2 className="font-bold">IMMUNOLOGY</h2>
        </div>
        {/* white blood cells */}
        <h2 className="text-sm text-right mt-2 w-[70%]">TSH (ECLIA)</h2>
        <div className="flex justify-center items-center">
          <Input
            className="w-[80%]"
            value={TSHResult}
            onChange={(e) => {
              setTSHResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center">
          <Input
            className="w-[80%]"
            value={TSHUnit}
            onChange={(e) => {
              setTSHUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center">
          <Input
            className="w-[80%]"
            value={TSHRange}
            onChange={(e) => {
              setTSHRange(e.target.value);
            }}
          />
        </div>
        {/* white blood cells */}

        {/* re blood cells */}
        <h2 className="text-sm text-right mt-2 w-[70%]">FT4 (ECLIA)</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={FTFourResult}
            onChange={(e) => {
              setFTFourResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={FTFourUnit}
            onChange={(e) => {
              setFTFourUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={FTFourRange}
            onChange={(e) => {
              setFTFourRange(e.target.value);
            }}
          />
        </div>
        {/* re blood cells */}

        <div className="flex flex-row gap-2 mt-5 col-span-2">
          <Button className="w-full" size="xl" onClick={() => onSubmit()}>
            Process Result
          </Button>
          {currentRow?.id === 0 && (
            <Button
              className="w-full bg-green-500 text-white cursor-pointer"
              size="xl"
              onClick={() => onSubmit()}
            >
              Mark as Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
