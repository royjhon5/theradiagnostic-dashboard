import { createLaboratoryHemotology } from "@/app/api/services/laboratoryresult.api";
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

export default function HematologyComponent() {
  const { currentRow } = useMainContext();
  const [whiteBloodCellsResult, setWhiteBloodCellsResult] = useState("");
  const [whiteBloodCellsUnit, setWhiteBloodCellsUnit] = useState("10^9/L");
  const [whiteBloodCellsRange, setWhiteBloodCellsRange] =
    useState("4.00~10.50");
  const [redBloodCellsResult, setRedBloodCellsResult] = useState("");
  const [redBloodCellsUnit, setRedBloodCellsUnit] = useState("10^12/L");
  const [redBloodCellsRange, setRedBloodCellsRange] = useState("4.20~5.40");

  const [hemoglobinResult, setHemoglobinResult] = useState("");
  const [hemoglobinUnit, setHemoglobinUnit] = useState("g/L");
  const [hemoglobinRange, setHemoglobinRange] = useState("125~160");

  const [HematocritResult, setHematocritResult] = useState("");
  const [HematocritUnit, setHematocritUnit] = useState("N/A");
  const [HematocritRange, setHematocritRange] = useState("0.37~0.47");

  const [CorpusVolumeResult, setCorpusVolumeResult] = useState("");
  const [CorpusVolumeUnit, setCorpusVolumeUnit] = useState("fL");
  const [CorpusVolumeRange, setCorpusVolumeRange] = useState("78~100");

  const [CorpusHbResult, setCorpusHbResult] = useState("");
  const [CorpusHbUnit, setCorpusHbUnit] = useState("pg");
  const [CorpusHbRange, setCorpusHbRange] = useState("27~31");

  const [CorpusHbConcResult, setCorpusHbConcResult] = useState("");
  const [CorpusHbConcUnit, setCorpusHbConcUnit] = useState("N/A");
  const [CorpusHbConcRange, setCorpusHbConcRange] = useState("0.32~0.36");

  const [RBCResult, setRBCResult] = useState("");
  const [RBCUnit, setRBCUnit] = useState("%");
  const [RBCRange, setRBCRange] = useState("11.0~16.0");

  const [plateletResult, setPlateletResult] = useState("");
  const [plateletUnit, setPlateletUnit] = useState("10^9/L");
  const [plateletRange, setPlateletRange] = useState("150~450");

  const [segmentersResult, setSegmentersResult] = useState("");
  const [segmentersUnit, setSegmentersUnit] = useState("%");
  const [segmentersRange, setSegmentersRange] = useState("50.0~70.0");

  const [lymphocytesResult, setLymphocytesResult] = useState("");
  const [lymphocytesUnit, setLymphocytesUnit] = useState("%");
  const [lymphocytesRange, setLymphocytesRange] = useState("18.0~42.0");

  const [monocytesResult, setMonocytesResult] = useState("");
  const [monocytesUnit, setMonocytesUnit] = useState("%");
  const [monocytesRange, setMonocytesRange] = useState("2.0~11.0");

  const [EosinophilsResult, setEosinophilsResult] = useState("");
  const [EosinophilsUnit, setEosinophilsUnit] = useState("%");
  const [EosinophilsRange, setEosinophilsRange] = useState("0.0~6.0");

  const [basophilsResult, setBasophilsResult] = useState("");
  const [basophilsUnit, setBasophilsUnit] = useState("%");
  const [basophilsRange, setBasophilsRange] = useState("0.0~2.0");

  const [bandResult, setBandResult] = useState("");
  const [bandUnit, setBandUnit] = useState("%");
  const [bandRange, setBandRange] = useState("0.0~5.0");

  const [absoSegResult, setAbsoSegResult] = useState("");
  const [absoSegUnit, setAbsoSegUnit] = useState("10^9/L");
  const [absoSegRange, setAbsoSegRange] = useState("1.30~6.00");

  const [absoLymphocyteResult, setAbsoLymphocyteResult] = useState("");
  const [absoLymphocyteUnit, setAbsoLymphocyteUnit] = useState("10^9/L");
  const [absoLymphocyteRange, setAbsoLymphocyteRange] = useState("1.50~3.50");

  const [absoMonocyteResult, setAbsoMonocyteResult] = useState("");
  const [absoMonocyteUnit, setAbsoMonocyteUnit] = useState("10^9/L");
  const [absoMonocyteRange, setAbsoMonocyteRange] = useState("<1.00");

  const [absoEosinophilResult, setAbsoEosinophilResult] = useState("");
  const [absoEosinophilUnit, setAbsoEosinophilUnit] = useState("10^9/L");
  const [absoEosinophilRange, setAbsoEosinophilRange] = useState("<0.70");

  const [absoBasophilResult, setAbsoBasophilResult] = useState("");
  const [absoBasophilUnit, setAbsoBasophilUnit] = useState("10^9/L");
  const [absoBasophilRange, setAbsoBasophilRange] = useState("<0.10");

  const [absobandResult, setabsoBandResult] = useState("");
  const [absobandUnit, setabsoBandUnit] = useState("10^9/L");
  const [absobandRange, setabsoBandRange] = useState("<1.00");

  const { setLoading } = useAppLoaderContext();
  const { mutate } = useMutation({
    mutationFn: createLaboratoryHemotology,
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
      hematology: {
        whiteBloodCellsResults: whiteBloodCellsResult || "N/A",
        whiteBloodUnit: whiteBloodCellsUnit,
        whiteBloodRange: whiteBloodCellsRange,
        redBloodCellsResults: redBloodCellsResult || "N/A",
        redBloodUnit: redBloodCellsUnit,
        redBloodRange: redBloodCellsRange,
        hemoglobinResults: hemoglobinResult || "N/A",
        hemoglobinUnit: hemoglobinUnit,
        hemoglobinRange: hemoglobinRange,
        hematocritResult: HematocritResult || "N/A",
        hematocritUnit: HematocritUnit,
        hematocritRange: HematocritRange,
        meanCorpuscularVolumeResult: CorpusVolumeResult || "N/A",
        meanCorpuscularVolumeUnit: CorpusVolumeUnit,
        meanCorpuscularVolumeRange: CorpusVolumeRange,
        meanCorpuscularHbResult: CorpusHbResult || "N/A",
        meanCorpuscularHbUnit: CorpusHbUnit,
        meanCorpuscularHbRange: CorpusHbRange,
        meanCorpuscularHbConcResult: CorpusHbConcResult || "N/A",
        meanCorpuscularHbConcUnit: CorpusHbConcUnit,
        meanCorpuscularHbConcRange: CorpusHbConcRange,
        rbcDistributionWidthResult: RBCResult || "N/A",
        rbcDistributionWidthUnit: RBCUnit,
        rbcDistributionWidthRange: RBCRange,
        plateletCountResult: plateletResult || "N/A",
        plateletCountUnit: plateletUnit,
        plateletCountRange: plateletRange,
        segmentersNeutrophilsResult: segmentersResult || "N/A",
        segmentersNeutrophilsUnit: segmentersUnit,
        segmentersNeutrophilsRange: segmentersRange,
        lymphocytesResult: lymphocytesResult || "N/A",
        lymphocytesUnit: lymphocytesUnit,
        lymphocytesRange: lymphocytesRange,
        monocytesResult: monocytesResult || "N/A",
        monocytesUnit: monocytesUnit,
        monocytesRange: monocytesRange,
        eosinophlisResult: EosinophilsResult || "N/A",
        eosinophlisUnit: EosinophilsUnit,
        eosinophlisRange: EosinophilsRange,
        basophilsResult: basophilsResult || "N/A",
        basophilsUnit: basophilsUnit,
        basophilsRange: basophilsRange,
        bandsResult: bandResult || "N/A",
        bandsUnit: bandUnit,
        bandsRange: bandRange,
        absoluteSegNeutroCountResult: absoSegResult || "N/A",
        absoluteSegNeutroCountUnit: absoSegUnit,
        absoluteSegNeutroCountRange: absoSegRange,
        absoluteLymphocyteCountResult: absoLymphocyteResult || "N/A",
        absoluteLymphocyteCountUnit: absoLymphocyteUnit,
        absoluteLymphocyteCountRange: absoLymphocyteRange,
        absoluteMonocyteCountResult: absoMonocyteResult || "N/A",
        absoluteMonocyteCountUnit: absoMonocyteUnit,
        absoluteMonocyteCountRange: absoMonocyteRange,
        absoluteEosinophilCountResult: absoEosinophilResult || "N/A",
        absoluteEosinophilCountUnit: absoEosinophilUnit,
        absoluteEosinophilCountRange: absoEosinophilRange,
        absoluteBasophilCountResult: absoBasophilResult || "N/A",
        absoluteBasophilCountUnit: absoBasophilUnit,
        absoluteBasophilCountRange: absoBasophilRange,
        absoluteBandCountResult: absobandResult || "N/A",
        absoluteBandCountUnit: absobandUnit,
        absoluteBandCountRange: absobandRange,
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
          <h2 className="font-bold">HEMATOLOGY</h2>
        </div>
        <div className="col-span-4">
          <h2 className="font-bold text-sm">Complete Blood Count</h2>
        </div>
        {/* white blood cells */}
        <h2 className="text-sm text-right mt-2 w-[70%]">White Blood Cells</h2>
        <div className="flex justify-center items-center">
          <Input
            className="w-[80%]"
            value={whiteBloodCellsResult}
            onChange={(e) => {
              setWhiteBloodCellsResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center">
          <Input
            className="w-[80%]"
            value={whiteBloodCellsUnit}
            onChange={(e) => {
              setWhiteBloodCellsUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center">
          <Input
            className="w-[80%]"
            value={whiteBloodCellsRange}
            onChange={(e) => {
              setWhiteBloodCellsRange(e.target.value);
            }}
          />
        </div>
        {/* white blood cells */}

        {/* re blood cells */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Red Blood Cells</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={redBloodCellsResult}
            onChange={(e) => {
              setRedBloodCellsResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={redBloodCellsUnit}
            onChange={(e) => {
              setRedBloodCellsUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={redBloodCellsRange}
            onChange={(e) => {
              setRedBloodCellsRange(e.target.value);
            }}
          />
        </div>
        {/* re blood cells */}

        {/* Hemoglobin */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Hemoglobin</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={hemoglobinResult}
            onChange={(e) => {
              setHemoglobinResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={hemoglobinUnit}
            onChange={(e) => {
              setHemoglobinUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={hemoglobinRange}
            onChange={(e) => {
              setHemoglobinRange(e.target.value);
            }}
          />
        </div>
        {/* Hemoglobin */}

        {/* Hematocrit */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Hematocrit</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={HematocritResult}
            onChange={(e) => {
              setHematocritResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={HematocritUnit}
            onChange={(e) => {
              setHematocritUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={HematocritRange}
            onChange={(e) => {
              setHematocritRange(e.target.value);
            }}
          />
        </div>
        {/* Hematocrit */}

        {/* Mean Corpuscular Volume */}
        <h2 className="text-sm text-right mt-2 w-[70%]">
          Mean Corpuscular Volume
        </h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CorpusVolumeResult}
            onChange={(e) => {
              setCorpusVolumeResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CorpusVolumeUnit}
            onChange={(e) => {
              setCorpusVolumeUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CorpusVolumeRange}
            onChange={(e) => {
              setCorpusVolumeRange(e.target.value);
            }}
          />
        </div>
        {/* Mean Corpuscular Volume */}

        {/* Mean Corpuscular Hb */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Mean Corpuscular Hb</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CorpusHbResult}
            onChange={(e) => {
              setCorpusHbResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CorpusHbUnit}
            onChange={(e) => {
              setCorpusHbUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CorpusHbRange}
            onChange={(e) => {
              setCorpusHbRange(e.target.value);
            }}
          />
        </div>
        {/* Mean Corpuscular Hb */}

        {/* Mean Corpuscular Hb Conc. */}
        <h2 className="text-sm text-right mt-2 w-[70%]">
          Mean Corpuscular Hb Conc.
        </h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CorpusHbConcResult}
            onChange={(e) => {
              setCorpusHbConcResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CorpusHbConcUnit}
            onChange={(e) => {
              setCorpusHbConcUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={CorpusHbConcRange}
            onChange={(e) => {
              setCorpusHbConcRange(e.target.value);
            }}
          />
        </div>
        {/* Mean Corpuscular Hb Conc. */}

        {/* RBC Distribution Width */}
        <h2 className="text-sm text-right mt-2 w-[70%]">
          RBC Distribution Width
        </h2>
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
        {/* RBC Distribution Width */}

        {/*  Platelet Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Platelet Count</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={plateletResult}
            onChange={(e) => {
              setPlateletResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={plateletUnit}
            onChange={(e) => {
              setPlateletUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={plateletRange}
            onChange={(e) => {
              setPlateletRange(e.target.value);
            }}
          />
        </div>
        {/* Platelet Count */}
        <div className="col-span-4">
          <h2 className="font-bold text-sm">Diff. Count (Relative) </h2>
        </div>

        {/*  Segmenters / Nuetrophils */}
        <h2 className="text-sm text-right mt-2 w-[70%]">
          Segmenters / Nuetrophils
        </h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={segmentersResult}
            onChange={(e) => {
              setSegmentersResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={segmentersUnit}
            onChange={(e) => {
              setSegmentersUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={segmentersRange}
            onChange={(e) => {
              setSegmentersRange(e.target.value);
            }}
          />
        </div>
        {/* Segmenters / Nuetrophils */}

        {/*  Lymphocytes */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Lymphocytes</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={lymphocytesResult}
            onChange={(e) => {
              setLymphocytesResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={lymphocytesUnit}
            onChange={(e) => {
              setLymphocytesUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={lymphocytesRange}
            onChange={(e) => {
              setLymphocytesRange(e.target.value);
            }}
          />
        </div>
        {/* Lymphocytes */}

        {/*  Monocytes */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Monocytes</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={monocytesResult}
            onChange={(e) => {
              setMonocytesResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={monocytesUnit}
            onChange={(e) => {
              setMonocytesUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={monocytesRange}
            onChange={(e) => {
              setMonocytesRange(e.target.value);
            }}
          />
        </div>
        {/* Monocytes */}

        {/*  Eosinophils */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Eosinophils</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={EosinophilsResult}
            onChange={(e) => {
              setEosinophilsResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={EosinophilsUnit}
            onChange={(e) => {
              setEosinophilsUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={EosinophilsRange}
            onChange={(e) => {
              setEosinophilsRange(e.target.value);
            }}
          />
        </div>
        {/* Eosinophils */}

        {/*  Basophils */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Basophils</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={basophilsResult}
            onChange={(e) => {
              setBasophilsResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={basophilsUnit}
            onChange={(e) => {
              setBasophilsUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={basophilsRange}
            onChange={(e) => {
              setBasophilsRange(e.target.value);
            }}
          />
        </div>
        {/* Basophils */}

        {/*  Bands */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Bands</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={bandResult}
            onChange={(e) => {
              setBandResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={bandUnit}
            onChange={(e) => {
              setBandUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={bandRange}
            onChange={(e) => {
              setBandRange(e.target.value);
            }}
          />
        </div>
        {/* Bands */}

        <div className="col-span-4">
          <h2 className="font-bold text-sm">Diff. Count (Absolute) </h2>
        </div>

        {/*  Absolute Seg/Neutro Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">
          Absolute Seg/Neutro Count
        </h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoSegResult}
            onChange={(e) => {
              setAbsoSegResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoSegUnit}
            onChange={(e) => {
              setAbsoSegUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoSegRange}
            onChange={(e) => {
              setAbsoSegRange(e.target.value);
            }}
          />
        </div>
        {/* Absolute Seg/Neutro Count */}

        {/*  Absolute Lymphocyte Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">
          Absolute Lymphocyte Count
        </h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoLymphocyteResult}
            onChange={(e) => {
              setAbsoLymphocyteResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoLymphocyteUnit}
            onChange={(e) => {
              setAbsoLymphocyteUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoLymphocyteRange}
            onChange={(e) => {
              setAbsoLymphocyteRange(e.target.value);
            }}
          />
        </div>
        {/* Absolute Lymphocyte Count */}

        {/*  Absolute Monocyte Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">
          Absolute Monocyte Count
        </h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoMonocyteResult}
            onChange={(e) => {
              setAbsoMonocyteResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoMonocyteUnit}
            onChange={(e) => {
              setAbsoMonocyteUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoMonocyteRange}
            onChange={(e) => {
              setAbsoMonocyteRange(e.target.value);
            }}
          />
        </div>
        {/* Absolute Monocyte Count */}

        {/*  Absolute Eosinophil Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">
          Absolute Eosinophil Count
        </h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoEosinophilResult}
            onChange={(e) => {
              setAbsoEosinophilResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoEosinophilUnit}
            onChange={(e) => {
              setAbsoEosinophilUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoEosinophilRange}
            onChange={(e) => {
              setAbsoEosinophilRange(e.target.value);
            }}
          />
        </div>
        {/* Absolute Eosinophil Count */}

        {/*  Absolute Basophil Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">
          Absolute Basophil Count
        </h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoBasophilResult}
            onChange={(e) => {
              setAbsoBasophilResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoBasophilUnit}
            onChange={(e) => {
              setAbsoBasophilUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absoBasophilRange}
            onChange={(e) => {
              setAbsoBasophilRange(e.target.value);
            }}
          />
        </div>
        {/* Absolute Basophil Count */}

        {/*  Absolute Basophil Count */}
        <h2 className="text-sm text-right mt-2 w-[70%]">Absolute Band Count</h2>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absobandResult}
            onChange={(e) => {
              setabsoBandResult(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absobandUnit}
            onChange={(e) => {
              setabsoBandUnit(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center mt-2">
          <Input
            className="w-[80%]"
            value={absobandRange}
            onChange={(e) => {
              setabsoBandRange(e.target.value);
            }}
          />
        </div>
        {/* Absolute Band Count */}

        <div className="mt-6 flex justify-center col-span-4">
          <Button className="w-full" size="xl" onClick={() => onSubmit()}>
            Process Result
          </Button>
        </div>
      </div>
    </div>
  );
}
