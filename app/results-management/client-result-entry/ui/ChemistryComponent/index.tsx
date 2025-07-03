import { createLaboratoryChemistry } from "@/app/api/services/laboratoryresult.api";
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

export default function ChemistryComponent() {
  const { currentRow } = useMainContext();
  const [FastingBloodSugarResult, setFastingBloodSugarResult] = useState("");
  const [FastingBloodSugarUnit, setFastingBloodSugarUnit] =
    useState("70 ~ 100");
  const [FastingBloodSugarRange, setFastingBloodSugarRange] =
    useState("6.68 mmol/L");

  const [TwoHPBloodSugarResult, setTwoHPBloodSugarResult] = useState("");
  const [TwoHPBloodSugarUnit, setTwoHPBloodSugarUnit] = useState("< 140");
  const [TwoHPBloodSugarRange, setTwoHPBloodSugarRange] =
    useState("7.98 mmol/L");

  const [CreatinineResult, setCreatinineResult] = useState("");
  const [CreatinineUnit, setCreatinineUnit] = useState("0.60 ~ 1.20");
  const [CreatinineRange, setCreatinineRange] = useState(
    "83.98 umol/L   53.04~106.08"
  );

  const [EGFRCKDEPIResult, setEGFRCKDEPIResult] = useState("");
  const [EGFRCKDEPIUnit, setEGFRCKDEPIUnit] = useState("ml/min/1.73m2");
  const [EGFRCKDEPIRange, setEGFRCKDEPIRange] = useState("N/A");

  const [SGPTALResult, setSGPTALResult] = useState("");
  const [SGPTALUnit, setSGPTALUnit] = useState("< 34");
  const [SGPTALRange, setSGPTALRange] = useState("18.00 U/L    < 34");

  const [CholesterolResult, setCholesterolResult] = useState("");
  const [CholesterolUnit, setCholesterolUnit] = useState("< 200");
  const [CholesterolRange, setCholesterolRange] = useState(
    "4.43 mmol/L    < 5.14"
  );

  const [TriglyceridesResult, setTriglyceridesResult] = useState("");
  const [TriglyceridesUnit, setTriglyceridesUnit] = useState("10 ~ 150");
  const [TriglyceridesRange, setTriglyceridesRange] = useState(
    "1.33 mmol/L   <5.14"
  );

  const [HdlResult, setHdlResult] = useState("");
  const [HdlUnit, setHdlUnit] = useState("F: > 65");
  const [HdlRange, setHdlRange] = useState("1.13 mmol/L F: > 1.69");

  const [LdlResult, setLdlResult] = useState("");
  const [LdlUnit, setLdlUnit] = useState("< 130");
  const [LdlRange, setLdlRange] = useState("2.74 mmol/L <3/.38");

  const [VldlResult, setVldlResult] = useState("");
  const [VldlUnit, setVldlUnit] = useState("2.00 ~ 38.00");
  const [VldlRange, setVldlRange] = useState("0.61 mmol/L   0.05 ~ 1.00");

  const [CholHdlResult, setCholHdlResult] = useState("");
  const [CholHdlUnit, setCholHdlUnit] = useState("< 3.08");
  const [CholHdlRange, setCholHdlRange] = useState("< 3.08");

  const { setLoading } = useAppLoaderContext();
  const { mutate } = useMutation({
    mutationFn: createLaboratoryChemistry,
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
      chemistry: {
        fastingBloodSugarResult: FastingBloodSugarResult,
        fastingBloodSugarUnit: FastingBloodSugarUnit,
        fastingBloodSugarRange: FastingBloodSugarRange,
        twoHPPBloodSugarResult: TwoHPBloodSugarResult,
        twoHPPBloodSugarUnit: TwoHPBloodSugarUnit,
        twoHPPBloodSugarRange: TwoHPBloodSugarRange,
        creatinineResult: CreatinineResult,
        creatinineUnit: CreatinineUnit,
        creatinineRange: CreatinineRange,
        eGFRCKDEPIResult: EGFRCKDEPIResult,
        eGFRCKDEPIUnit: EGFRCKDEPIUnit,
        eGFRCKDEPIRange: EGFRCKDEPIRange,
        sgptaltResult: SGPTALResult,
        sgptaltUnit: SGPTALUnit,
        sgptaltRange: SGPTALRange,
        cholesterolResult: CholesterolResult,
        cholesterolUnit: CholesterolUnit,
        cholesterolRange: CholesterolRange,
        triglyceridesResult: TriglyceridesResult,
        triglyceridesUnit: TriglyceridesUnit,
        triglyceridesRange: TriglyceridesRange,
        hdlResult: HdlResult,
        hdlUnit: HdlUnit,
        hdlRange: HdlRange,
        ldlResult: LdlResult,
        ldlUnit: LdlUnit,
        ldlRange: LdlRange,
        vldlResult: VldlResult,
        vldlUnit: VldlUnit,
        vldlRange: VldlRange,
        cholhdlRatioResult: CholHdlResult,
        cholhdlRatioUnit: CholHdlUnit,
        cholhdlRatioRange: CholHdlRange,
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
          <h2 className="font-bold underline">THERA-DIABETIC PANEL A</h2>
        </div>
        <div className="col-span-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <h2 className="font-bold text-sm">CHEMISTRY</h2>
            <h2 className="font-bold text-sm">Conventional Units</h2>
            <h2 className="font-bold text-sm">SI Units</h2>
          </div>
        </div>
        {/* white blood cells */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Fasting Blood Sugar</h2>
        <div className="flex justify-center items-center">
          <Input
            className="w-[80%]"
            value={FastingBloodSugarResult}
            onChange={(e) => {
              setFastingBloodSugarResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center">
          <Input
            className="w-[80%]"
            value={FastingBloodSugarUnit}
            onChange={(e) => {
              setFastingBloodSugarUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center">
          <Input
            className="w-[80%]"
            value={FastingBloodSugarRange}
            onChange={(e) => {
              setFastingBloodSugarRange(e.target.value);
            }}
          />
        </div>
        {/* white blood cells */}

        {/* re blood cells */}
        <h2 className="text-sm text-right mt-2 w-[70%]">2H PP Blood Sugar</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={TwoHPBloodSugarResult}
            onChange={(e) => {
              setTwoHPBloodSugarResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={TwoHPBloodSugarUnit}
            onChange={(e) => {
              setTwoHPBloodSugarUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={TwoHPBloodSugarRange}
            onChange={(e) => {
              setTwoHPBloodSugarRange(e.target.value);
            }}
          />
        </div>
        {/* re blood cells */}

        {/* Hemoglobin */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Creatinine</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CreatinineResult}
            onChange={(e) => {
              setCreatinineResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CreatinineUnit}
            onChange={(e) => {
              setCreatinineUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CreatinineRange}
            onChange={(e) => {
              setCreatinineRange(e.target.value);
            }}
          />
        </div>
        {/* Hemoglobin */}

        {/* Hematocrit */}
        <h2 className="text-sm text-right mt-2 w-[70%]">eGFR CKD-EPI</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={EGFRCKDEPIResult}
            onChange={(e) => {
              setEGFRCKDEPIResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={EGFRCKDEPIUnit}
            onChange={(e) => {
              setEGFRCKDEPIUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={EGFRCKDEPIRange}
            onChange={(e) => {
              setEGFRCKDEPIRange(e.target.value);
            }}
          />
        </div>
        {/* Hematocrit */}

        {/* Mean Corpuscular Volume */}
        <h2 className="text-sm text-right mt-2 w-[70%]">SGPT/ALT</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={SGPTALResult}
            onChange={(e) => {
              setSGPTALResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={SGPTALUnit}
            onChange={(e) => {
              setSGPTALUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={SGPTALRange}
            onChange={(e) => {
              setSGPTALRange(e.target.value);
            }}
          />
        </div>
        {/* Mean Corpuscular Volume */}

        <div className="col-span-4">
          <h2 className="font-bold text-sm">Lipid Profile</h2>
        </div>

        {/*  Segmenters / Nuetrophils */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Cholesterol</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CholesterolResult}
            onChange={(e) => {
              setCholesterolResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CholesterolUnit}
            onChange={(e) => {
              setCholesterolUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CholesterolRange}
            onChange={(e) => {
              setCholesterolRange(e.target.value);
            }}
          />
        </div>
        {/* Segmenters / Nuetrophils */}

        {/*  Lymphocytes */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Triglycerides</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={TriglyceridesResult}
            onChange={(e) => {
              setTriglyceridesResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={TriglyceridesUnit}
            onChange={(e) => {
              setTriglyceridesUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={TriglyceridesRange}
            onChange={(e) => {
              setTriglyceridesRange(e.target.value);
            }}
          />
        </div>
        {/* Lymphocytes */}

        {/*  Monocytes */}
        <h2 className="text-sm text-right mt-2 w-[70%]">HDL</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={HdlResult}
            onChange={(e) => {
              setHdlResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={HdlUnit}
            onChange={(e) => {
              setHdlUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={HdlRange}
            onChange={(e) => {
              setHdlRange(e.target.value);
            }}
          />
        </div>
        {/* Monocytes */}

        {/*  Eosinophils */}
        <h2 className="text-sm text-right mt-2 w-[70%]">LDL</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={LdlResult}
            onChange={(e) => {
              setLdlResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={LdlUnit}
            onChange={(e) => {
              setLdlUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={LdlRange}
            onChange={(e) => {
              setLdlRange(e.target.value);
            }}
          />
        </div>
        {/* Eosinophils */}

        {/*  Basophils */}
        <h2 className="text-sm text-right mt-2 w-[70%]">VLDL</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={VldlResult}
            onChange={(e) => {
              setVldlResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={VldlUnit}
            onChange={(e) => {
              setVldlUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={VldlRange}
            onChange={(e) => {
              setVldlRange(e.target.value);
            }}
          />
        </div>
        {/* Basophils */}

        {/*  Bands */}
        <h2 className="text-sm text-right mt-2 w-[70%]">CHOL/HDL Ratio</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CholHdlResult}
            onChange={(e) => {
              setCholHdlResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CholHdlUnit}
            onChange={(e) => {
              setCholHdlUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CholHdlRange}
            onChange={(e) => {
              setCholHdlRange(e.target.value);
            }}
          />
        </div>
        {/* Bands */}

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
