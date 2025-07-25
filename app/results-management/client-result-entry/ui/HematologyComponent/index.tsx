import { createLaboratoryHemotology } from "@/app/api/services/laboratoryresult.api";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BaseResponseType } from "@/types/BaseResponse";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMainContext } from "../../context/context-provider";
import Cookies from "js-cookie";
import { ReusableAccordion } from "@/components/custom-accordion";
import useGetCart from "@/app/client-registration/hooks/useGetCart";
import { CreatableCombobox } from "@/components/creatable-combobox";
import { bloodTypeOption, bloodtypeOptionTwo } from "../../data/data";
import {
  getHGBRange,
  getHGTRange,
  getLYMRange,
  getMCHCRange,
  getMCHRange,
  getMONRange,
  getMVCRange,
  getPLTRange,
  getRBCRange,
  getRDWRange,
  getSEGRange,
  getWBCRange,
} from "../../utils/referenceRanges";

export default function HematologyComponent() {
  const { currentRow } = useMainContext();
  const { testNameMergeOnly } = useGetCart(
    currentRow ? Number(currentRow.id) : 0
  );

  useEffect(() => {
    if (currentRow?.gender === "Male") {
      setEsrRange("0 ~ 15");
    } else {
      setEsrRange("0 ~ 20");
    }
  }, [currentRow]);
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

  const [metamyelocytesResult, setMetamyelocytesResult] = useState("");
  const [metamyelocytesUnit, setMetamyelocytesUnit] = useState("%");
  const [metamyelocytesRange, setMetamyelocytesRange] = useState("0 ~ 1");

  const [myelocytesResult, setMyelocytesResult] = useState("");
  const [myelocytesUnit, setMyelocytesUnit] = useState("%");
  const [myelocytesRange, setMyelocytesRange] = useState("0 ~ 1");

  const [promyelocytesResult, setPromyelocytesResult] = useState("");
  const [promyelocytesUnit, setPromyelocytesUnit] = useState("%");
  const [promyelocytesRange, setPromyelocytesRange] = useState("0 ~ 1");

  const [blastCellsResult, setBlastCellsResult] = useState("");
  const [blastCellsUnit, setBlastCellsUnit] = useState("%");
  const [blastCellsRange, setBlastCellsRange] = useState("0");

  const [clottingTimeResult, setClottingTimeResult] = useState("");
  const [clottingTimeRange, setClottingTimeRange] = useState("3 to 6 minutes");

  const [bleedingTimeResult, setBleedingTimeResult] = useState("");
  const [bleedingTimeRange, setBleedingTimeRange] = useState("1 to 3 minutes");

  const [esrResult, setEsrResult] = useState("");
  const [esrUnit, setEsrUnit] = useState("mm/hr");
  const [esrRange, setEsrRange] = useState("");

  const [bloodTypeResult, setBloodTypeResult] = useState("");
  const [bloodTypeUnit, setBloodTypeUnit] = useState("");
  useEffect(() => {
    if (currentRow?.dateOfBirth && currentRow?.gender) {
      const genderStr = currentRow.gender.toUpperCase();
      if (genderStr === "MALE" || genderStr === "FEMALE") {
        const dob = currentRow.dateOfBirth;

        setWhiteBloodCellsRange(getWBCRange(dob, genderStr));
        setRedBloodCellsRange(getRBCRange(dob, genderStr));
        setHemoglobinRange(getHGBRange(dob, genderStr));
        setHematocritRange(getHGTRange(dob, genderStr));
        setCorpusVolumeRange(getMVCRange(dob, genderStr));
        setCorpusHbRange(getMCHRange(dob, genderStr));
        setCorpusHbConcRange(getMCHCRange(dob, genderStr));
        setRBCRange(getRDWRange(dob, genderStr));
        setPlateletRange(getPLTRange(dob, genderStr));
        setSegmentersRange(getSEGRange(dob, genderStr));
        setLymphocytesRange(getLYMRange(dob, genderStr));
        setMonocytesRange(getMONRange(dob, genderStr));
      }
    }
  }, [currentRow]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  useEffect(() => {
    const total =
      parseFloat(segmentersResult || "0") +
      parseFloat(lymphocytesResult || "0") +
      parseFloat(monocytesResult || "0") +
      parseFloat(EosinophilsResult || "0") +
      parseFloat(basophilsResult || "0") +
      parseFloat(bandResult || "0") +
      parseFloat(metamyelocytesResult || "0") +
      parseFloat(myelocytesResult || "0") +
      parseFloat(promyelocytesResult || "0") +
      parseFloat(blastCellsResult || "0");

    setTotalPercentage(total);
  }, [
    segmentersResult,
    lymphocytesResult,
    monocytesResult,
    EosinophilsResult,
    basophilsResult,
    bandResult,
    metamyelocytesResult,
    myelocytesResult,
    promyelocytesResult,
    blastCellsResult,
  ]);
  const { setLoading } = useAppLoaderContext();
  const { mutate } = useMutation({
    mutationFn: createLaboratoryHemotology,
    onSuccess: async (res) => {
      const data = res as BaseResponseType<number>;
      if (data.isSuccess) {
        toast.success("Result has been saved.");
      }
      setLoading(false);
      ClearData();
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
    if (totalPercentage !== 100) {
      toast.error("Total percentage of differential count must equal 100.");
      return;
    }
    setLoading(true);
    mutate({
      userId: Cookies.get("userid") || "",
      clientId: currentRow?.id,
      hematology: {
        whiteBloodCellsResults: whiteBloodCellsResult,
        whiteBloodUnit: whiteBloodCellsUnit,
        whiteBloodRange: whiteBloodCellsRange,
        redBloodCellsResults: redBloodCellsResult,
        redBloodUnit: redBloodCellsUnit,
        redBloodRange: redBloodCellsRange,
        hemoglobinResults: hemoglobinResult,
        hemoglobinUnit: hemoglobinUnit,
        hemoglobinRange: hemoglobinRange,
        hematocritResult: HematocritResult,
        hematocritUnit: HematocritUnit,
        hematocritRange: HematocritRange,
        meanCorpuscularVolumeResult: CorpusVolumeResult,
        meanCorpuscularVolumeUnit: CorpusVolumeUnit,
        meanCorpuscularVolumeRange: CorpusVolumeRange,
        meanCorpuscularHbResult: CorpusHbResult,
        meanCorpuscularHbUnit: CorpusHbUnit,
        meanCorpuscularHbRange: CorpusHbRange,
        meanCorpuscularHbConcResult: CorpusHbConcResult,
        meanCorpuscularHbConcUnit: CorpusHbConcUnit,
        meanCorpuscularHbConcRange: CorpusHbConcRange,
        rbcDistributionWidthResult: RBCResult,
        rbcDistributionWidthUnit: RBCUnit,
        rbcDistributionWidthRange: RBCRange,
        plateletCountResult: plateletResult,
        plateletCountUnit: plateletUnit,
        plateletCountRange: plateletRange,
        segmentersNeutrophilsResult: segmentersResult,
        segmentersNeutrophilsUnit: segmentersUnit,
        segmentersNeutrophilsRange: segmentersRange,
        lymphocytesResult: lymphocytesResult,
        lymphocytesUnit: lymphocytesUnit,
        lymphocytesRange: lymphocytesRange,
        monocytesResult: monocytesResult,
        monocytesUnit: monocytesUnit,
        monocytesRange: monocytesRange,
        eosinophlisResult: EosinophilsResult,
        eosinophlisUnit: EosinophilsUnit,
        eosinophlisRange: EosinophilsRange,
        basophilsResult: basophilsResult,
        basophilsUnit: basophilsUnit,
        basophilsRange: basophilsRange,
        bandsResult: bandResult,
        bandsUnit: bandUnit,
        bandsRange: bandRange,
        metamyelocytesResult: metamyelocytesResult,
        metamyelocytesUnit: metamyelocytesUnit,
        metamyelocytesRange: metamyelocytesRange,
        myelocytesResult: myelocytesResult,
        myelocytesUnit: myelocytesUnit,
        myelocytesRange: myelocytesRange,
        promyelocytesResult: promyelocytesResult,
        promyelocytesUnit: promyelocytesUnit,
        promyelocytesRange: promyelocytesRange,
        blastCellsResult: blastCellsResult,
        blastCellsUnit: blastCellsUnit,
        blastCellsRange: blastCellsRange,
        absoluteSegNeutroCountResult: "",
        absoluteSegNeutroCountUnit: "",
        absoluteSegNeutroCountRange: "",
        absoluteLymphocyteCountResult: "",
        absoluteLymphocyteCountUnit: "",
        absoluteLymphocyteCountRange: "",
        absoluteMonocyteCountResult: "",
        absoluteMonocyteCountUnit: "",
        absoluteMonocyteCountRange: "",
        absoluteEosinophilCountResult: "",
        absoluteEosinophilCountUnit: "",
        absoluteEosinophilCountRange: "",
        absoluteBasophilCountResult: "",
        absoluteBasophilCountUnit: "",
        absoluteBasophilCountRange: "",
        absoluteBandCountResult: "",
        absoluteBandCountUnit: "",
        absoluteBandCountRange: "",
        clottingTimeResult: clottingTimeResult,
        clottingTimeRange: clottingTimeRange,
        bleedingTimeResult: bleedingTimeResult,
        bleedingTimeRange: bleedingTimeRange,
        esrResult: esrResult,
        esrUnit: esrUnit,
        esrRange: esrRange,
        bloodTypeResult: bloodTypeResult,
        posNegBloodType: bloodTypeUnit,
      },
    });
  };

  const ClearData = () => {
    setWhiteBloodCellsResult("");
    setRedBloodCellsResult("");
    setHemoglobinResult("");
    setHematocritResult("");
    setCorpusVolumeResult("");
    setCorpusHbResult("");
    setCorpusHbConcResult("");
    setRBCResult("");
    setPlateletResult("");
    setSegmentersResult("");
    setLymphocytesResult("");
    setMonocytesResult("");
    setEosinophilsResult("");
    setBasophilsResult("");
    setBandResult("");
  };

  const accordionData = [
    {
      name: "Complete Blood Count (CBC)",
      value: "item-1",
      title: "COMPLETE BLOOD COUNT",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
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

          <div className="col-span-4">
            <h2 className="text-sm mt-5 mb-5 w-[70%] font-bold text-lg">
              RED CELLS INDICES
            </h2>
          </div>

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

          <h2 className="text-sm text-right mt-2 w-[70%]">
            Mean Corpuscular Hb
          </h2>
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

          <div className="col-span-4">
            <h2 className="text-sm mt-5 mb-5 w-[70%] font-bold text-lg">
              DIFFERENTIAL COUNT
            </h2>
          </div>

          <h2 className="text-sm text-right mt-2 w-[70%]">Nuetrophils</h2>
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

          <h2 className="text-sm text-right mt-2 w-[70%]">Metamyelocytes</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={metamyelocytesResult}
              onChange={(e) => {
                setMetamyelocytesResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={metamyelocytesUnit}
              onChange={(e) => {
                setMetamyelocytesUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={metamyelocytesRange}
              onChange={(e) => {
                setMetamyelocytesRange(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right mt-2 w-[70%]">Myelocytes</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={myelocytesResult}
              onChange={(e) => {
                setMyelocytesResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={myelocytesUnit}
              onChange={(e) => {
                setMyelocytesUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={myelocytesRange}
              onChange={(e) => {
                setMyelocytesRange(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right mt-2 w-[70%]">Promyelocytes</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={promyelocytesResult}
              onChange={(e) => {
                setPromyelocytesResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={promyelocytesUnit}
              onChange={(e) => {
                setPromyelocytesUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={promyelocytesRange}
              onChange={(e) => {
                setPromyelocytesRange(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right mt-2 w-[70%]">Blast Cells</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={blastCellsResult}
              onChange={(e) => {
                setBlastCellsResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={blastCellsUnit}
              onChange={(e) => {
                setBlastCellsUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={blastCellsRange}
              onChange={(e) => {
                setBlastCellsRange(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right mt-2 w-[70%]">Total</h2>
          <div className="flex justify-center items-center mt-2">
            <Input className="w-[80%]" value={totalPercentage} disabled />
          </div>
          <div className="flex justify-center items-center mt-2"></div>
          <div className="flex justify-center items-center mt-2"></div>
        </div>
      ),
    },
    {
      name: "Bleeding-Clotting Time (CTBT)",
      value: "item-4",
      title: "Bleeding-Clotting Time (CTBT)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">Clotting Time</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={clottingTimeResult}
              onChange={(e) => {
                setClottingTimeResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2"></div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={clottingTimeRange}
              onChange={(e) => {
                setClottingTimeRange(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right mt-2 w-[70%]">Bleeding Time</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={bleedingTimeResult}
              onChange={(e) => {
                setBleedingTimeResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2"></div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={bleedingTimeRange}
              onChange={(e) => {
                setBleedingTimeRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Erythrocyte Sedimentation Rate (ESR)",
      value: "item-5",
      title: "ERYTHROCYTE SEDIMENTATION RATE (ESR)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">ESR</h2>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={esrResult}
              onChange={(e) => {
                setEsrResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={esrUnit}
              onChange={(e) => {
                setEsrUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <Input
              className="w-[80%]"
              value={esrRange}
              onChange={(e) => {
                setEsrRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Blood Typing",
      value: "item-6",
      title: "Blood Typing",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">Blood Type</h2>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={bloodTypeOption}
              value={bloodTypeResult}
              onChange={setBloodTypeResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <CreatableCombobox
              options={bloodtypeOptionTwo}
              value={bloodTypeUnit}
              onChange={setBloodTypeUnit}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center mt-2"></div>
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
              No Hematology tests found for this patient.
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
