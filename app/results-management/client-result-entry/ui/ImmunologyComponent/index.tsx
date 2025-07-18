import { createLaboratoryImmunology } from "@/app/api/services/laboratoryresult.api";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BaseResponseType } from "@/types/BaseResponse";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useMainContext } from "../../context/context-provider";
import Cookies from "js-cookie";
import { ReusableAccordion } from "@/components/custom-accordion";
import useGetCart from "@/app/client-registration/hooks/useGetCart";

export default function ImmunologyComponent() {
  const { currentRow } = useMainContext();
  const { testNameMergeOnly } = useGetCart(
    currentRow ? Number(currentRow.id) : 0
  );
  const [TSHResult, setTSHResult] = useState("");
  const [TSHUnit, setTSHUnit] = useState("uIU/mL");
  const [TSHRange, setTSHRange] = useState("0.27 ~ 4.20");

  const [FTFourResult, setFTFourResult] = useState("");
  const [FTFourUnit, setFTFourUnit] = useState("pmol/L");
  const [FTFourRange, setFTFourRange] = useState("12.00 ~ 22.00");

  const [ccpIgGResult, setCcpIgGResult] = useState("");
  const [ccpIgGUnit, setCcpIgGUnit] = useState("");
  const [ccpIgGRange, setCcpIgGRange] = useState("");

  const [psaResult, setPsaResult] = useState("");
  const [psaUnit, setPsaUnit] = useState("");
  const [psaRange, setPsaRange] = useState("");

  const [ft3Result, setFt3Result] = useState("");
  const [ft3Unit, setFt3Unit] = useState("");
  const [ft3Range, setFt3Range] = useState("");

  const [t3Result, setT3Result] = useState("");
  const [t3Unit, setT3Unit] = useState("");
  const [t3Range, setT3Range] = useState("");

  const [t4Result, setT4Result] = useState("");
  const [t4Unit, setT4Unit] = useState("");
  const [t4Range, setT4Range] = useState("");

  const [proBnpResult, setProBnpResult] = useState("");
  const [proBnpUnit, setProBnpUnit] = useState("");
  const [proBnpRange, setProBnpRange] = useState("");

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
        ccpIgGResult: ccpIgGResult,
        ccpIgGUnit: ccpIgGUnit,
        ccpIgGRange: ccpIgGRange,
        psaResult: psaResult,
        psaUnit: psaUnit,
        psaRange: psaRange,
        ftThreeResult: ft3Result,
        ftThreeUnit: ft3Unit,
        ftThreeRange: ft3Range,
        tThreeResult: t3Result,
        tThreeUnit: t3Unit,
        tThreeRange: t3Range,
        tFourResult: t4Result,
        tFourUnit: t4Unit,
        tFourRange: t4Range,
        proBNPResult: proBnpResult,
        proBNPUnit: proBnpUnit,
        proBNPRange: proBnpRange,
      },
    });
  };

  const accordionData = [
    {
      name: "CBC",
      value: "item-1",
      title: "CCP IgG",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">CCP IgG</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ccpIgGResult}
              onChange={(e) => {
                setCcpIgGResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ccpIgGUnit}
              onChange={(e) => {
                setCcpIgGUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ccpIgGRange}
              onChange={(e) => {
                setCcpIgGRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "CBC",
      value: "item-2",
      title: "PSA",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right w-[70%]">PSA</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={psaResult}
              onChange={(e) => {
                setPsaResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={psaUnit}
              onChange={(e) => {
                setPsaUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={psaRange}
              onChange={(e) => {
                setPsaRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "CBC",
      value: "item-3",
      title: "FT3",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right w-[70%]">FT3</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ft3Result}
              onChange={(e) => {
                setFt3Result(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ft3Unit}
              onChange={(e) => {
                setFt3Unit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ft3Range}
              onChange={(e) => {
                setFt3Range(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "CBC",
      value: "item-4",
      title: "FT4",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right w-[70%]">FT4</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={FTFourResult}
              onChange={(e) => {
                setFTFourResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={FTFourUnit}
              onChange={(e) => {
                setFTFourUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={FTFourRange}
              onChange={(e) => {
                setFTFourRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "CBC",
      value: "item-5",
      title: "T3",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right w-[70%]">T3</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={t3Result}
              onChange={(e) => {
                setT3Result(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={t3Unit}
              onChange={(e) => {
                setT3Unit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={t3Range}
              onChange={(e) => {
                setT3Range(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "CBC",
      value: "item-6",
      title: "T4",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right w-[70%]">T4</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={t4Result}
              onChange={(e) => {
                setT4Result(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={t4Range}
              onChange={(e) => {
                setT4Range(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={t4Unit}
              onChange={(e) => {
                setT4Unit(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "CBC",
      value: "item-7",
      title: "Pro-BNP",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right w-[70%]">Pro-BNP</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={proBnpResult}
              onChange={(e) => {
                setProBnpResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={proBnpUnit}
              onChange={(e) => {
                setProBnpUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={proBnpRange}
              onChange={(e) => {
                setProBnpRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "CBC",
      value: "item-8",
      title: "TSH",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right w-[70%]">TSH</h2>
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
        </div>
      ),
    },
  ];

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <h2 className="font-bold text-white bg-blue-500 p-1 rounded-tl-xl">
          <span className="ml-2">TEST</span>
        </h2>
        <h2 className="text-center font-bold bg-blue-500 text-white p-1">
          Result
        </h2>
        <h2 className="text-center font-bold bg-blue-500 text-white p-1">
          Unit
        </h2>
        <h2 className="text-center font-bold bg-blue-500 text-white p-1 rounded-tr-xl">
          Reference Range
        </h2>
        <div className="col-span-4">
          {testNameMergeOnly && testNameMergeOnly.length > 0 ? (
            <ReusableAccordion
              tests={testNameMergeOnly}
              type="single"
              sections={accordionData}
              defaultValue="item-0"
            />
          ) : (
            <div className="text-center text-red-500 font-semibold mt-4">
              No immunology tests found for this patient.
            </div>
          )}
        </div>

        {currentRow && (
          <div className="flex flex-row gap-2 mt-5 col-span-4">
            <Button className="w-full" size="xl" onClick={onSubmit}>
              Process Result
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
