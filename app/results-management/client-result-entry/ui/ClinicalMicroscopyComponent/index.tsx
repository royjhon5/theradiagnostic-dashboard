import { createClinicalmicroscopy } from "@/app/api/services/laboratoryresult.api";
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
import {
  bilirubinOption,
  bloodOption,
  fecalColorOption,
  fecalConsistencyOption,
  fecaluniversalOption,
  glucoseOption,
  ketonesOption,
  leukocytesOption,
  nitriteOption,
  phOption,
  proteinOption,
  spGravityOption,
  universalOption,
  uranilysisColorOption,
  urinalysisTransparencyOption,
  urobilinogenOption,
} from "../../data/data";
import useGetCart from "@/app/client-registration/hooks/useGetCart";

export default function ClinicalMicroscopyComponent() {
  const { currentRow } = useMainContext();
  const { testNameMergeOnly } = useGetCart(
    currentRow ? Number(currentRow.id) : 0 // or use undefined/null depending on your hook logic
  );
  const [MicralResult, setMicralResult] = useState("");
  const [MicralUnit, setMicralUnit] = useState("mg/L");
  const [MicralRange, setMicralRange] = useState("< 20");

  const [ColorResult, setColorResult] = useState("");
  const [ColorUnit, setColorUnit] = useState("");
  const [ColorRange, setColorRange] = useState("");

  const [TransparencyResult, setTransparencyResult] = useState("");
  const [TransparencyUnit, setTransparencyUnit] = useState("");
  const [TransparencyRange, setTransparencyRange] = useState("");

  const [SpGravityResult, setSpGravityResult] = useState("");
  const [SpGravityUnit, setSpGravityUnit] = useState("");
  const [SpGravityRange, setSpGravityRange] = useState("1.003 ~ 1.035");

  const [PhResult, setPhResult] = useState("");
  const [PhUnit, setPhUnit] = useState("");
  const [PhRange, setPhRange] = useState("5.0 ~ 8.0");

  const [ProteinResult, setProteinResult] = useState("");
  const [ProteinUnit, setProteinUnit] = useState("");
  const [ProteinRange, setProteinRange] = useState("");

  const [GluccoseResult, setGluccoseResult] = useState("");
  const [GluccoseUnit, setGluccoseUnit] = useState("");
  const [GluccuseRange, setGluccuseRange] = useState("");

  const [BilirubinResult, setBilirubinResult] = useState("");
  const [BilirubinUnit, setBilirubinUnit] = useState("");
  const [BiliburinRange, setBiliburinRange] = useState("");

  const [BloodResult, setBloodResult] = useState("");
  const [BloodUnit, setBloodUnit] = useState("");
  const [BloodRange, setBloodRange] = useState("");

  const [LeucocytesResult, setLeucocytesResult] = useState("");
  const [LeucocytesUnit, setLeucocytesUnit] = useState("");
  const [LeucocytesRange, setLeucocytesRange] = useState("");

  const [NitriteResult, setNitriteResult] = useState("");
  const [NitriteUnit, setNitriteUnit] = useState("");
  const [NitritRange, setNitritRange] = useState("");

  const [UrobilinogenResult, setUrobilinogenResult] = useState("");
  const [UrobilinogenUnit, setUrobilinogenUnit] = useState("mg/dl");
  const [UrobilinogenRange, setUrobilinogenRange] = useState("< 1.0");

  const [KetoneResult, setKetoneResult] = useState("");
  const [KetoneUnit, setKetoneUnit] = useState("");
  const [KetoneRange, setKetoneRange] = useState("");

  const [RBCResult, setRBCResult] = useState("");
  const [RBCUnit, setRBCUnit] = useState("/hpf");
  const [RBCRange, setRBCRange] = useState("0 ~ 3");

  const [WBCResult, setWBCResult] = useState("");
  const [WBCUnit, setWBCUnit] = useState("/hpf");
  const [WBCRange, setWBCRange] = useState("0 ~ 5");

  const [EpithelialResult, setEpithelialResult] = useState("");
  const [EpithelialUnit, setsetEpithelialUnit] = useState("");
  const [EpithelialRange, setEpithelialRange] = useState("");

  const [BacteriaResult, setBacteriaResult] = useState("");
  const [BacteriaUnit, setBacteriaUnit] = useState("");
  const [BacteriaRange, setBacteriaRange] = useState("");

  const [MucusThreadResult, setMucusThreadResult] = useState("");
  const [MucusThreadUnit, setMucusThreadUnit] = useState("");
  const [MucusThreadRange, setMucusThreadRange] = useState("");

  const [HyalineCastResult, setHyalineCastResult] = useState("");
  const [HyalineCastUnit, setHyalineCastUnit] = useState("/lpf");
  const [HyalineCastRange, setHyalineCastRange] = useState("");

  const [fecalColorResult, setFecalColorResult] = useState("");
  const [fecalColorUnit, setFecalColorUnit] = useState("");

  const [fecalConsistencyResult, setFecalConsistencyResult] = useState("");
  const [fecalConsistencyUnit, setFecalConsistencyUnit] = useState("");

  const [fecalWBCResult, setFecalWBCResult] = useState("");
  const [fecalWBCUnit, setFecalWBCUnit] = useState("");

  const [fecalRBCResult, setFecalRBCResult] = useState("");
  const [fecalRBCUnit, setFecalRBCUnit] = useState("");

  const [fecalFatGlobulesResult, setFecalFatGlobulesResult] = useState("");
  const [fecalFatGlobulesUnit, setFecalFatGlobulesUnit] = useState("");

  const [fecalParasiteResult, setFecalParasiteResult] = useState("");
  const [fecalParasiteUnit, setFecalParasiteUnit] = useState("");

  const [fecalBloodResult, setFecalBloodResult] = useState("");
  const [fecalBloodUnit, setFecalBloodUnit] = useState("");

  const [fecalMucusResult, setFecalMucusResult] = useState("");
  const [fecalMucusUnit, setFecalMucusUnit] = useState("");

  const [fecalOccultBloodResult, setFecalOccultBloodResult] = useState("");
  const [fecalOccultUnit, setFecalOccultBloodUnit] = useState("");

  const [pregnacyTestResult, setPregenacyTestResult] = useState("");
  const [pregnacyTestUnit, setPregnacyTestUnit] = useState("");

  const { setLoading } = useAppLoaderContext();
  const { mutate } = useMutation({
    mutationFn: createClinicalmicroscopy,
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
      clinicalmicroscopy: {
        micralResult: MicralResult || "N/A",
        micralUnit: MicralUnit,
        micralRange: MicralRange,
        urineColorResult: ColorResult || "N/A",
        urineColorUnit: ColorUnit,
        urineColorRange: ColorRange,
        urineTransparencyResult: TransparencyResult || "N/A",
        urineTransparencyUnit: TransparencyUnit,
        urineTransparencyRange: TransparencyRange,
        spGravityResult: SpGravityResult || "N/A",
        spGravityUnit: SpGravityUnit,
        spGravityRange: SpGravityRange,
        pHResult: PhResult || "N/A",
        pHUnit: PhUnit,
        pHRange: PhRange,
        proteinResult: ProteinResult || "N/A",
        proteinUnit: ProteinUnit,
        proteinRange: ProteinRange,
        glucoseResult: GluccoseResult || "N/A",
        glucoseUnit: GluccoseUnit,
        glucoseRange: GluccuseRange,
        bilirubinResult: BilirubinResult || "N/A",
        bilirubinUnit: BilirubinUnit,
        bilirubinRange: BiliburinRange,
        bloodResult: BloodResult || "N/A",
        bloodUnit: BloodUnit,
        bloodRange: BloodRange,
        leucocytesResult: LeucocytesResult || "N/A",
        leucocytesUnit: LeucocytesUnit,
        lucocytesRange: LeucocytesRange,
        nitriteResult: NitriteResult || "N/A",
        nitriteUnit: NitriteUnit,
        nitriteRange: NitritRange,
        urobilinogenResult: UrobilinogenResult || "N/A",
        urobilinogenUnit: UrobilinogenUnit,
        urobilinogenRange: UrobilinogenRange,
        ketoneResult: KetoneResult || "N/A",
        ketoneUnit: KetoneUnit,
        ketoneRange: KetoneRange,
        rbcResult: RBCResult || "N/A",
        rbcUnit: RBCUnit,
        rbcRange: RBCRange,
        wbcResult: WBCResult || "N/A",
        wbcUnit: WBCUnit,
        wbcRange: WBCRange,
        epithelialResult: EpithelialResult || "N/A",
        epithelialUnit: EpithelialUnit,
        epithelialRange: EpithelialRange,
        bacteriaResult: BacteriaResult || "N/A",
        bacteriaUnit: BacteriaUnit,
        bacteriaRange: BacteriaRange,
        mucusThreadResult: MucusThreadResult || "N/A",
        mucusThreadUnit: MucusThreadUnit,
        mucusThreadRange: MucusThreadRange,
        hyalineCastResult: HyalineCastResult || "N/A",
        hyalineCastUnit: HyalineCastUnit,
        hyalineCastRange: HyalineCastRange,
        fecalysisColorResult: fecalColorResult,
        fecalysisColorUnit: fecalColorUnit,
        fecalysisConsistencyResult: fecalConsistencyResult,
        fecalysisConsistencyUnit: fecalConsistencyUnit,
        fecalysisBloodResult: fecalBloodResult,
        fecalysisBloodUnit: fecalBloodUnit,
        fecalysisMucusResult: fecalMucusResult,
        fecalysisMucusUnit: fecalMucusUnit,
        fecalysisParasite: fecalParasiteResult,
        fecalysisFatGlobulesResult: fecalFatGlobulesResult,
        fecalysisWBCResult: fecalWBCResult,
        fecalysisWBCUnit: fecalWBCUnit,
        fecalysisRBCResult: fecalRBCResult,
        fecalysisRBCUnit: fecalRBCUnit,
        urineHCGResult: pregnacyTestResult,
        urineHCGUnit: pregnacyTestUnit,
        occultBloodResult: fecalOccultBloodResult,
        occultBloodUnit: fecalOccultUnit,
      },
    });
  };

  const accordionData = [
    {
      name: "MICRAL TEST",
      value: "item-1",
      title: "MICRAL TEST",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">MICRAL</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={MicralResult}
              onChange={(e) => {
                setMicralResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={MicralUnit}
              onChange={(e) => {
                setMicralUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={MicralRange}
              onChange={(e) => {
                setMicralRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Urine Analysis (UA)",
      value: "item-2",
      title: "Urine Analysis (UA)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-4">
            <h2 className="font-bold text-sm">PHYSICAL EXAMINATION</h2>
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Color</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={uranilysisColorOption}
              value={ColorResult}
              onChange={setColorResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={ColorUnit}
              onChange={(e) => {
                setColorUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={ColorRange}
              onChange={(e) => {
                setColorRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Transparency</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={urinalysisTransparencyOption}
              value={TransparencyResult}
              onChange={setTransparencyResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={TransparencyUnit}
              onChange={(e) => {
                setTransparencyUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={TransparencyRange}
              onChange={(e) => {
                setTransparencyRange(e.target.value);
              }}
            />
          </div>
          <div className="col-span-4">
            <h2 className="font-bold text-sm">CHEMICAL EXAMINATION</h2>
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">pH</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={phOption}
              value={PhResult}
              onChange={setPhResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={PhUnit}
              onChange={(e) => {
                setPhUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={PhRange}
              onChange={(e) => {
                setPhRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Sp. Gravity</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={spGravityOption}
              value={SpGravityResult}
              onChange={setSpGravityResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={SpGravityUnit}
              onChange={(e) => {
                setSpGravityUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={SpGravityRange}
              onChange={(e) => {
                setSpGravityRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Gluccose</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={glucoseOption}
              value={GluccoseResult}
              onChange={setGluccoseResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={GluccoseUnit}
              onChange={(e) => {
                setGluccoseUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={GluccuseRange}
              onChange={(e) => {
                setGluccuseRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Protein</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={proteinOption}
              value={ProteinResult}
              onChange={setProteinResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={ProteinUnit}
              onChange={(e) => {
                setProteinUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={ProteinRange}
              onChange={(e) => {
                setProteinRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Urobilinogen</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={urobilinogenOption}
              value={UrobilinogenResult}
              onChange={setUrobilinogenResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={UrobilinogenUnit}
              onChange={(e) => {
                setUrobilinogenUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={UrobilinogenRange}
              onChange={(e) => {
                setUrobilinogenRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Bilirubin</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={bilirubinOption}
              value={BilirubinResult}
              onChange={setBilirubinResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={BilirubinUnit}
              onChange={(e) => {
                setBilirubinUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={BiliburinRange}
              onChange={(e) => {
                setBiliburinRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Ketones</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={ketonesOption}
              value={KetoneResult}
              onChange={setKetoneResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={KetoneUnit}
              onChange={(e) => {
                setKetoneUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={KetoneRange}
              onChange={(e) => {
                setKetoneRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Nitrite</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={nitriteOption}
              value={NitriteResult}
              onChange={setNitriteResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={NitriteUnit}
              onChange={(e) => {
                setNitriteUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={NitritRange}
              onChange={(e) => {
                setNitritRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Leucocytes</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={leukocytesOption}
              value={LeucocytesResult}
              onChange={setLeucocytesResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={LeucocytesUnit}
              onChange={(e) => {
                setLeucocytesUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={LeucocytesRange}
              onChange={(e) => {
                setLeucocytesRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Blood</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={bloodOption}
              value={BloodResult}
              onChange={setBloodResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={BloodUnit}
              onChange={(e) => {
                setBloodUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={BloodRange}
              onChange={(e) => {
                setBloodRange(e.target.value);
              }}
            />
          </div>
          <div className="col-span-4">
            <h2 className="font-bold text-sm">MICROSCOPIC EXAMINATION </h2>
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">WBC / PUS CELLS</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={WBCResult}
              onChange={(e) => {
                setWBCResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={WBCUnit}
              onChange={(e) => {
                setWBCUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={WBCRange}
              onChange={(e) => {
                setWBCRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">RBC</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={RBCResult}
              onChange={(e) => {
                setRBCResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={RBCUnit}
              onChange={(e) => {
                setRBCUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={RBCRange}
              onChange={(e) => {
                setRBCRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Epithelial Cells</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={universalOption}
              value={EpithelialResult}
              onChange={setEpithelialResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={EpithelialUnit}
              onChange={(e) => {
                setsetEpithelialUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={EpithelialRange}
              onChange={(e) => {
                setEpithelialRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Bacteria</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={universalOption}
              value={BacteriaResult}
              onChange={setBacteriaResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={BacteriaUnit}
              onChange={(e) => {
                setBacteriaUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={BacteriaRange}
              onChange={(e) => {
                setBacteriaRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Mucus Threads</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={universalOption}
              value={MucusThreadResult}
              onChange={setMucusThreadResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={MucusThreadUnit}
              onChange={(e) => {
                setMucusThreadUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={MucusThreadRange}
              onChange={(e) => {
                setMucusThreadRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Hyaline Cast</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={HyalineCastResult}
              onChange={(e) => {
                setHyalineCastResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={HyalineCastUnit}
              onChange={(e) => {
                setHyalineCastUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={HyalineCastRange}
              onChange={(e) => {
                setHyalineCastRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Fecalysis/ Stool Exam (SE)",
      value: "item-3",
      title: "Fecalysis/ Stool Exam (SE)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="col-span-4">
            <h2 className="font-bold text-sm">MACROSCOPIC</h2>
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Color</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={fecalColorOption}
              value={fecalColorResult}
              onChange={setFecalColorResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={fecalColorUnit}
              onChange={(e) => {
                setFecalColorUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>

          <h2 className="text-sm text-right mt-2 w-[70%]">Cosistency</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={fecalConsistencyOption}
              value={fecalConsistencyResult}
              onChange={setFecalConsistencyResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={fecalConsistencyUnit}
              onChange={(e) => {
                setFecalConsistencyUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <div className="col-span-4">
            <h2 className="font-bold text-sm">MICROSCOPIC</h2>
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">WBC</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={fecalWBCResult}
              onChange={(e) => {
                setFecalWBCResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={fecalWBCUnit}
              onChange={(e) => {
                setFecalWBCUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Blood</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={fecalBloodResult}
              onChange={(e) => {
                setFecalBloodResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={fecalBloodUnit}
              onChange={(e) => {
                setFecalBloodUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Mucus Thread</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={fecalMucusResult}
              onChange={(e) => {
                setFecalMucusResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={fecalMucusUnit}
              onChange={(e) => {
                setFecalMucusUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <h2 className="text-sm text-right mt-2 w-[70%]">RBC</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={fecalRBCResult}
              onChange={(e) => {
                setFecalRBCResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={fecalRBCUnit}
              onChange={(e) => {
                setFecalRBCUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Fat Globules</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={fecaluniversalOption}
              value={fecalFatGlobulesResult}
              onChange={setFecalFatGlobulesResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={fecalFatGlobulesUnit}
              onChange={(e) => {
                setFecalFatGlobulesUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Parasites</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={fecalParasiteResult}
              onChange={(e) => {
                setFecalParasiteResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={fecalParasiteUnit}
              onChange={(e) => {
                setFecalParasiteUnit(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "FECAL OCCULT BLOOD TEST (FOBT)",
      value: "item-4",
      title: "FECAL OCCULT BLOOD TEST (FOBT)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">OCCULT BLOOD</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={nitriteOption}
              value={fecalOccultBloodResult}
              onChange={setFecalOccultBloodResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={fecalOccultUnit}
              onChange={(e) => {
                setFecalOccultBloodUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>
        </div>
      ),
    },
    {
      name: "PREGNANCY TEST (URINE) PT",
      value: "item-5",
      title: "PREGNANCY TEST (URINE) PT",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">PREGNANCY TEST</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={nitriteOption}
              value={pregnacyTestResult}
              onChange={setPregenacyTestResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={pregnacyTestUnit}
              onChange={(e) => {
                setPregnacyTestUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>
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
        <div className="col-span-4 mt-2">
          <h2 className="font-bold underline"></h2>
        </div>
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
              No Clinical Microscopy tests found for this patient.
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
