import { createSerologyHIV } from "@/app/api/services/laboratoryresult.api";
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
import { CreatableCombobox } from "@/components/creatable-combobox";
import { serologyHIVTestOption, serologyMethod } from "../../data/data";

export default function SerologyHIVComponent() {
  const { currentRow } = useMainContext();

  const [hivtestResult, setHivTestResult] = useState("");
  const [hivTestMethod, setHivTestMethod] = useState("");

  const [kitUsed, setKitUsed] = useState("");
  const [kitExpiry, setKitExpiry] = useState("");
  const [KitLotNumber, setKitLotNumber] = useState("");
  const [diluentLotNumber, setDiluentLotNumber] = useState("");
  const [KitReferenceNumber, setKitReferenceNumber] = useState("");

  const [remarks, setRemarks] = useState("");

  const { setLoading } = useAppLoaderContext();
  const { mutate } = useMutation({
    mutationFn: createSerologyHIV,
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
      serologyHiv: {
        hivRapidDiagnosticTestResult: hivtestResult,
        hivRapidDiagnosticTestMethod: hivTestMethod,
        kitUsed: kitUsed,
        kitExpiry: kitExpiry,
        kitLotNumber: KitLotNumber,
        diluentLotNumber: diluentLotNumber,
        kitReferenceNumber: KitReferenceNumber,
        remarks: remarks,
      },
    });
  };

  const accordionData = [
    {
      name: "CBC",
      value: "item-1",
      title: "HUMAN IMMUNODEFICIENCY VIRUS (HIV) TEST",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right w-[70%]">
            HIV RAPID DIAGNOSTIC TEST
          </h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyHIVTestOption}
              value={hivtestResult}
              onChange={setHivTestResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center col-span-2">
            <CreatableCombobox
              options={serologyMethod}
              value={hivTestMethod}
              onChange={setHivTestMethod}
              placeholder=""
            />
          </div>

          <h2 className="text-sm text-right w-[70%]">Kit Used</h2>
          <div className="flex justify-center items-center col-span-3">
            <Input
              className="w-[80%]"
              value={kitUsed}
              onChange={(e) => {
                setKitUsed(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right w-[70%]">Kit Expiry</h2>
          <div className="flex justify-center items-center">
            <Input
              type="date"
              className="w-[80%]"
              value={kitExpiry}
              onChange={(e) => {
                setKitExpiry(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <div className="flex justify-center items-center"></div>

          <h2 className="text-sm text-right w-[70%]">Kit Lot Number</h2>
          <div className="flex justify-center items-center col-span-3">
            <Input
              className="w-[80%]"
              value={KitLotNumber}
              onChange={(e) => {
                setKitLotNumber(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right w-[70%]">Diluent Lot Number</h2>
          <div className="flex justify-center items-center col-span-3">
            <Input
              className="w-[80%]"
              value={diluentLotNumber}
              onChange={(e) => {
                setDiluentLotNumber(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right w-[70%]">Kit Reference Number</h2>
          <div className="flex justify-center items-center col-span-3">
            <Input
              className="w-[80%]"
              value={KitReferenceNumber}
              onChange={(e) => {
                setKitReferenceNumber(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right w-[70%]">Remarks</h2>
          <div className="flex justify-center items-center col-span-3">
            <Input
              className="w-[80%]"
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  const tests = [
    { testName: "CBC" },
    { testName: "RBS" },
    { testName: "Creatinine" },
    { testName: "Blood Urea Nitrogen" },
    { testName: "Uric Acid" },
    { testName: "ALT/SGPT" },
    { testName: "AST/SGOT" },
    { testName: "Uric Acid" },
    { testName: "Creatinine" },
    { testName: "Blood Urea Nitrogen" },
    { testName: "Uric Acid" },
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
          Method
        </h2>
        <h2 className="text-center font-bold bg-blue-500 text-white p-1 rounded-tr-xl"></h2>
        {/* white blood cells */}
        <div className="col-span-4">
          <ReusableAccordion
            tests={tests}
            type="single"
            sections={accordionData}
            defaultValue="item-0"
          />
        </div>

        <div className="flex flex-row gap-2 mt-5 col-span-4">
          <Button className="w-full" size="xl" onClick={onSubmit}>
            Process Result
          </Button>
        </div>
      </div>
    </div>
  );
}
