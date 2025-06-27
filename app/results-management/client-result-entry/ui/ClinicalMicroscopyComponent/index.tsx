import { createClinicalmicroscopy } from "@/app/api/services/laboratoryresult.api";
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

export default function ClinicalMicroscopyComponent() {
  const { currentRow } = useMainContext();

  const [MicralResult, setMicralResult] = useState("");
  const [MicralUnit, setMicralUnit] = useState("mg/L");
  const [MicralRange, setMicralRange] = useState("< 20");

  const [ColorResult, setColorResult] = useState("");
  const [ColorUnit, setColorUnit] = useState("N/A");
  const [ColorRange, setColorRange] = useState("N/A");

  const [TransparencyResult, setTransparencyResult] = useState("");
  const [TransparencyUnit, setTransparencyUnit] = useState("N/A");
  const [TransparencyRange, setTransparencyRange] = useState("N/A");

  const [SpGravityResult, setSpGravityResult] = useState("");
  const [SpGravityUnit, setSpGravityUnit] = useState("N/A");
  const [SpGravityRange, setSpGravityRange] = useState("1.003 ~ 1.035");

  const [PhResult, setPhResult] = useState("");
  const [PhUnit, setPhUnit] = useState("N/A");
  const [PhRange, setPhRange] = useState("5.0 ~ 8.0");

  const [ProteinResult, setProteinResult] = useState("");
  const [ProteinUnit, setProteinUnit] = useState("N/A");
  const [ProteinRange, setProteinRange] = useState("N/A");

  const [GluccoseResult, setGluccoseResult] = useState("");
  const [GluccoseUnit, setGluccoseUnit] = useState("N/A");
  const [GluccuseRange, setGluccuseRange] = useState("N/A");

  const [BilirubinResult, setBilirubinResult] = useState("");
  const [BilirubinUnit, setBilirubinUnit] = useState("N/A");
  const [BiliburinRange, setBiliburinRange] = useState("N/A");

  const [BloodResult, setBloodResult] = useState("");
  const [BloodUnit, setBloodUnit] = useState("N/A");
  const [BloodRange, setBloodRange] = useState("N/A");

  const [LeucocytesResult, setLeucocytesResult] = useState("");
  const [LeucocytesUnit, setLeucocytesUnit] = useState("N/A");
  const [LeucocytesRange, setLeucocytesRange] = useState("N/A");

  const [NitriteResult, setNitriteResult] = useState("");
  const [NitriteUnit, setNitriteUnit] = useState("N/A");
  const [NitritRange, setNitritRange] = useState("N/A");

  const [UrobilinogenResult, setUrobilinogenResult] = useState("");
  const [UrobilinogenUnit, setUrobilinogenUnit] = useState("mg/dl");
  const [UrobilinogenRange, setUrobilinogenRange] = useState("< 1.0");

  const [KetoneResult, setKetoneResult] = useState("");
  const [KetoneUnit, setKetoneUnit] = useState("N/A");
  const [KetoneRange, setKetoneRange] = useState("N/A");

  const [RBCResult, setRBCResult] = useState("");
  const [RBCUnit, setRBCUnit] = useState("/hpf");
  const [RBCRange, setRBCRange] = useState("0 ~ 3");

  const [WBCResult, setWBCResult] = useState("");
  const [WBCUnit, setWBCUnit] = useState("/hpf");
  const [WBCRange, setWBCRange] = useState("0 ~ 5");

  const [EpithelialResult, setEpithelialResult] = useState("");
  const [EpithelialUnit, setsetEpithelialUnit] = useState("N/A");
  const [EpithelialRange, setEpithelialRange] = useState("N/A");

  const [BacteriaResult, setBacteriaResult] = useState("");
  const [BacteriaUnit, setBacteriaUnit] = useState("N/A");
  const [BacteriaRange, setBacteriaRange] = useState("N/A");

  const [MucusThreadResult, setMucusThreadResult] = useState("");
  const [MucusThreadUnit, setMucusThreadUnit] = useState("N/A");
  const [MucusThreadRange, setMucusThreadRange] = useState("N/A");

  const [HyalineCastResult, setHyalineCastResult] = useState("");
  const [HyalineCastUnit, setHyalineCastUnit] = useState("/lpf");
  const [HyalineCastRange, setHyalineCastRange] = useState("N/A");

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
        <div className="col-span-4">
          <h2 className="font-bold text-sm">CLINICAL MICROSCOPY</h2>
        </div>
        {/* white blood cells */}
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
        {/* white blood cells */}

        <div className="col-span-4">
          <h2 className="font-bold text-sm">
            Routine Urinalysis <br /> Physical / Macroscopic{" "}
          </h2>
        </div>

        {/*  Segmenters / Nuetrophils */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Color</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={ColorResult}
            onChange={(e) => {
              setColorResult(e.target.value);
            }}
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
        {/* Segmenters / Nuetrophils */}

        {/*  Lymphocytes */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Transparency</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={TransparencyResult}
            onChange={(e) => {
              setTransparencyResult(e.target.value);
            }}
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
        {/* Lymphocytes */}
        <div className="col-span-4">
          <h2 className="font-bold text-sm">Chemical</h2>
        </div>
        {/*  Monocytes */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Sp. Gravity</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={SpGravityResult}
            onChange={(e) => {
              setSpGravityResult(e.target.value);
            }}
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
        {/* Monocytes */}

        {/*  Eosinophils */}
        <h2 className="text-sm text-right mt-2 w-[70%]">pH</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={PhResult}
            onChange={(e) => {
              setPhResult(e.target.value);
            }}
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
        {/* Eosinophils */}

        {/*  Basophils */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Protein</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={ProteinResult}
            onChange={(e) => {
              setProteinResult(e.target.value);
            }}
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
        {/* Basophils */}

        {/*  Bands */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Gluccose</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={GluccoseResult}
            onChange={(e) => {
              setGluccoseResult(e.target.value);
            }}
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
        {/* Bands */}

        {/*  Absolute Seg/Neutro Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Bilirubin</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={BilirubinResult}
            onChange={(e) => {
              setBilirubinResult(e.target.value);
            }}
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
        {/* Absolute Seg/Neutro Count */}

        {/*  Absolute Lymphocyte Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Blood</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={BloodResult}
            onChange={(e) => {
              setBloodResult(e.target.value);
            }}
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
        {/* Absolute Lymphocyte Count */}

        {/*  Absolute Monocyte Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Leucocytes</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={LeucocytesResult}
            onChange={(e) => {
              setLeucocytesResult(e.target.value);
            }}
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
        {/* Absolute Monocyte Count */}

        {/*  Absolute Eosinophil Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Nitrite</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={NitriteResult}
            onChange={(e) => {
              setNitriteResult(e.target.value);
            }}
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
        {/* Absolute Eosinophil Count */}

        {/*  Absolute Basophil Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Urobilinogen</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={UrobilinogenResult}
            onChange={(e) => {
              setUrobilinogenResult(e.target.value);
            }}
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

        <h2 className="text-sm text-right mt-2 w-[70%]">Ketone</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={KetoneResult}
            onChange={(e) => {
              setKetoneResult(e.target.value);
            }}
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

        <div className="col-span-4">
          <h2 className="font-bold text-sm">Microscopic </h2>
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

        <h2 className="text-sm text-right mt-2 w-[70%]">WBC</h2>
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

        <h2 className="text-sm text-right mt-2 w-[70%]">Epithelial Cells</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={EpithelialResult}
            onChange={(e) => {
              setEpithelialResult(e.target.value);
            }}
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
          <Input
            className="w-[80%]"
            value={BacteriaResult}
            onChange={(e) => {
              setBacteriaResult(e.target.value);
            }}
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
          <Input
            className="w-[80%]"
            value={MucusThreadResult}
            onChange={(e) => {
              setMucusThreadResult(e.target.value);
            }}
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

        <div className="mt-6 flex justify-center col-span-4">
          <Button className="w-full" size="xl" onClick={() => onSubmit()}>
            Process Result
          </Button>
        </div>
      </div>
    </div>
  );
}
