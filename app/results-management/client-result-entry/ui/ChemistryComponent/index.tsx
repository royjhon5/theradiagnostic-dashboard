import { createLaboratoryChemistry } from "@/app/api/services/laboratoryresult.api";
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

export default function ChemistryComponent() {
  const { currentRow } = useMainContext();
  const { testNameMergeOnly } = useGetCart(
    currentRow ? Number(currentRow.id) : 0
  );
  const [FastingBloodSugarResult, setFastingBloodSugarResult] = useState("");
  const [FastingBloodSugarUnit, setFastingBloodSugarUnit] =
    useState("70 ~ 100");
  const [FastingBloodSugarRange, setFastingBloodSugarRange] =
    useState("6.68 mmol/L");

  const [RandomBloodSugarResult, setRandomBloodSugarResult] = useState("");
  const [RandomBloodSugarUnit, setRandomBloodSugarUnit] = useState("70 ~ 100");
  const [RandomBloodSugarRange, setRandomBloodSugarRange] =
    useState("6.68 mmol/L");

  const [bloodUreaNitrogenResult, setBloodUreaNitrogenResult] = useState("");
  const [bloodUreaNitrogenUnit, setBloodUreaNitrogenUnit] = useState("");
  const [bloodUreaNitrogenRange, setBloodUreaNitrogenRange] = useState("");

  const [
    twoHoursPostPrandialGlucoseResult,
    setTwoHoursPostPrandialGlucoseResult,
  ] = useState("");
  const [twoHoursPostPrandialGlucoseUnit, setTwoHoursPostPrandialGlucoseUnit] =
    useState("");
  const [
    twoHoursPostPrandialGlucoseRange,
    setTwoHoursPostPrandialGlucoseRange,
  ] = useState("");

  const [amylaseResult, setAmylaseResult] = useState("");
  const [amylaseUnit, setAmylaseUnit] = useState("");
  const [amylaseRange, setAmylaseRange] = useState("");

  const [uricAcidResult, setUricAcidResult] = useState("");
  const [uricAcidUnit, setUricAcidUnit] = useState("");
  const [uricAcidRange, setUricAcidRange] = useState("");

  const [ASTSGOTResult, setASTSGOTResult] = useState("");
  const [ASTSGOTUnit, setASTSGOTUnit] = useState("");
  const [ASTSGOTRange, setASTSGOTRange] = useState("");

  const [AlkalineResult, setAlkalineResult] = useState("");
  const [AlkalineUnit, setAlkalineUnit] = useState("");
  const [AlkalineRange, setAlkalineRange] = useState("");

  const [totalCalciumResult, setTotalCalciumResult] = useState("");
  const [totalCalciumUnit, setTotalCalciumUnit] = useState("");
  const [totalCalciumRange, setTotalCalciumRange] = useState("");

  const [Hba1cResult, setHba1cResult] = useState("");
  const [Hba1cUnit, setHba1cUnit] = useState("");
  const [Hba1cRange, setHba1cRange] = useState("");

  const [CreatinineResult, setCreatinineResult] = useState("");
  const [CreatinineUnit, setCreatinineUnit] = useState("0.60 ~ 1.20");
  const [CreatinineRange, setCreatinineRange] = useState(
    "83.98 umol/L   53.04~106.08"
  );

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

  const [sodiumResult, setSodiumResult] = useState("");
  const [sodiumUnit, setSodiumUnit] = useState("");
  const [sodiumRange, setSodiumRange] = useState("");

  const [potassiumResult, setPotassiumResult] = useState("");
  const [potassiumUnit, setPotassiumUnit] = useState("");
  const [potassiumRange, setPotassiumRange] = useState("");

  const [chlorideResult, setChlorideResult] = useState("");
  const [chlorideUnit, setChlorideUnit] = useState("");
  const [chlorideRange, setChlorideRange] = useState("");

  const [ionizedCalciumResult, setIonizedCalciumResult] = useState("");
  const [ionizedCalciumUnit, setIonizedCalciumUnit] = useState("");
  const [ionizedCalciumRange, setIonizedCalciumRange] = useState("");

  const [totalBilirubinResult, setTotalBilirubinResult] = useState("");
  const [totalBilirubinUnit, setTotalBilirubinUnit] = useState("");
  const [totalBilirubinRange, setTotalBilirubinRange] = useState("");

  const [directBilirubinResult, setDirectBilirubinResult] = useState("");
  const [directBilirubinUnit, setDirectBilirubinUnit] = useState("");
  const [directBilirubinRange, setDirectBilirubinRange] = useState("");

  const [indirectBilirubinResult, setIndirectBilirubinResult] = useState("");
  const [indirectBilirubinUnit, setIndirectBilirubinUnit] = useState("");
  const [indirectBilirubinRange, setIndirectBilirubinRange] = useState("");

  const [totalProteinResult, setTotalProteinResult] = useState("");
  const [totalProteinUnit, setTotalProteinUnit] = useState("");
  const [totalProteinRange, setTotalProteinRange] = useState("");

  const [albuminResult, setAlbuminResult] = useState("");
  const [albuminUnit, setAlbuminUnit] = useState("");
  const [albuminRange, setAlbuminRange] = useState("");

  const [globulinResult, setGlobulinResult] = useState("");
  const [globulinUnit, setGlobulinUnit] = useState("");
  const [globulinRange, setGlobulinRange] = useState("");

  const [agRatioResult, setAgRatioResult] = useState("");
  const [agRatioUnit, setAgRatioUnit] = useState("");
  const [agRatioRange, setAgRatioRange] = useState("");

  // Oral Glucose Challenge Test
  const [oralGlucoseChallengeTestResult, setOralGlucoseChallengeTestResult] =
    useState("");
  const [oralGlucoseChallengeTestUnit, setOralGlucoseChallengeTestUnit] =
    useState("");
  const [oralGlucoseChallengeTestRange, setOralGlucoseChallengeTestRange] =
    useState("");

  // 50g OGTT
  const [fiftyGramsOGTTFBSResult, setFiftyGramsOGTTFBSResult] = useState("");
  const [fiftyGramsOGTTFBSUnit, setFiftyGramsOGTTFBSUnit] = useState("");
  const [fiftyGramsOGTTFBSRange, setFiftyGramsOGTTFBSRange] = useState("");

  const [fiftyGramsOGTT1stHourResult, setFiftyGramsOGTT1stHourResult] =
    useState("");
  const [fiftyGramsOGTT1stHourUnit, setFiftyGramsOGTT1stHourUnit] =
    useState("");
  const [fiftyGramsOGTT1stHourRange, setFiftyGramsOGTT1stHourRange] =
    useState("");

  // 75g OGTT
  const [seventyFiveGramsOGTTFBSResult, setSeventyFiveGramsOGTTFBSResult] =
    useState("");
  const [seventyFiveGramsOGTTFBSUnit, setSeventyFiveGramsOGTTFBSUnit] =
    useState("");
  const [seventyFiveGramsOGTTFBSRange, setSeventyFiveGramsOGTTFBSRange] =
    useState("");

  const [
    seventyFiveGramsOGTT1stHourResult,
    setSeventyFiveGramsOGTT1stHourResult,
  ] = useState("");
  const [seventyFiveGramsOGTT1stHourUnit, setSeventyFiveGramsOGTT1stHourUnit] =
    useState("");
  const [
    seventyFiveGramsOGTT1stHourRange,
    setSeventyFiveGramsOGTT1stHourRange,
  ] = useState("");

  const [
    seventyFiveGramsOGTT2ndHourResult,
    setSeventyFiveGramsOGTT2ndHourResult,
  ] = useState("");
  const [seventyFiveGramsOGTT2ndHourUnit, setSeventyFiveGramsOGTT2ndHourUnit] =
    useState("");
  const [
    seventyFiveGramsOGTT2ndHourRange,
    setSeventyFiveGramsOGTT2ndHourRange,
  ] = useState("");

  // 100g OGTT
  const [oneHundredGramsOGTTFBSResult, setOneHundredGramsOGTTFBSResult] =
    useState("");
  const [oneHundredGramsOGTTFBSUnit, setOneHundredGramsOGTTFBSUnit] =
    useState("");
  const [oneHundredGramsOGTTFBSRange, setOneHundredGramsOGTTFBSRange] =
    useState("");

  const [
    oneHundredGramsOGTT1stHourResult,
    setOneHundredGramsOGTT1stHourResult,
  ] = useState("");
  const [oneHundredGramsOGTT1stHourUnit, setOneHundredGramsOGTT1stHourUnit] =
    useState("");
  const [oneHundredGramsOGTT1stHourRange, setOneHundredGramsOGTT1stHourRange] =
    useState("");

  const [
    oneHundredGramsOGTT2ndHourResult,
    setOneHundredGramsOGTT2ndHourResult,
  ] = useState("");
  const [oneHundredGramsOGTT2ndHourUnit, setOneHundredGramsOGTT2ndHourUnit] =
    useState("");
  const [oneHundredGramsOGTT2ndHourRange, setOneHundredGramsOGTT2ndHourRange] =
    useState("");

  const [
    oneHundredGramsOGTT3rdHourResult,
    setOneHundredGramsOGTT3rdHourResult,
  ] = useState("");
  const [oneHundredGramsOGTT3rdHourUnit, setOneHundredGramsOGTT3rdHourUnit] =
    useState("");
  const [oneHundredGramsOGTT3rdHourRange, setOneHundredGramsOGTT3rdHourRange] =
    useState("");

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
        randomBloodSugarResult: RandomBloodSugarResult,
        randomBloodSugarUnit: RandomBloodSugarUnit,
        randomBloodSugarRange: RandomBloodSugarRange,
        creatinineResult: CreatinineResult,
        creatinineUnit: CreatinineUnit,
        creatinineRange: CreatinineRange,
        bloodUreaResult: bloodUreaNitrogenResult,
        bloodUreaUnit: bloodUreaNitrogenUnit,
        bloodUreaRange: bloodUreaNitrogenRange,
        uricAcidResult: uricAcidResult,
        uricAcidUnit: uricAcidUnit,
        uricAcidRange: uricAcidRange,
        sgptaltResult: SGPTALResult,
        sgptaltUnit: SGPTALUnit,
        sgptaltRange: SGPTALRange,
        sgotastResult: ASTSGOTResult,
        sgotastUnit: ASTSGOTUnit,
        sgotastRange: ASTSGOTRange,
        alkalinePhosphataseResult: AlkalineResult,
        alkalinePhosphataseUnit: AlkalineUnit,
        alkalinePhosphataseRange: AlkalineRange,
        totalCalciumResult: totalCalciumResult,
        totalCalciumUnit: totalCalciumUnit,
        totalCalciumRange: totalCalciumRange,
        hbA1CResult: Hba1cResult,
        hbA1CUnit: Hba1cUnit,
        hbA1Range: Hba1cRange,
        amylaseResult: amylaseResult,
        amylaseUnit: amylaseUnit,
        amylaseRange: amylaseRange,
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
        sodiumResult: sodiumResult,
        sodiumUnit: sodiumUnit,
        sodiumRange: sodiumRange,
        potassiumResult: potassiumResult,
        potassiumUnit: potassiumUnit,
        potassiumRange: potassiumRange,
        chlorideResult: chlorideResult,
        chlorideUnit: chlorideUnit,
        chlorideRange: chlorideRange,
        ionizedCalciumResult: ionizedCalciumResult,
        ionizedCalciumUnit: ionizedCalciumUnit,
        ionizedCalciumRange: ionizedCalciumRange,
        totalBilirubinResult: totalBilirubinResult,
        totalBilirubinUnit: totalBilirubinUnit,
        totalBilirubinRange: totalBilirubinRange,
        directBilirubinResult: directBilirubinResult,
        directBilirubinUnit: directBilirubinUnit,
        directBilirubinRange: directBilirubinRange,
        indirectBilirubinResult: indirectBilirubinResult,
        indirectBilirubinUnit: indirectBilirubinUnit,
        indirectBilirubinRange: indirectBilirubinRange,
        totalProteinResult: totalProteinResult,
        totalProteinUnit: totalProteinUnit,
        totalProteinRange: totalProteinRange,
        albuminResult: albuminResult,
        albuminUnit: albuminUnit,
        albuminRange: albuminRange,
        globulinResult: globulinResult,
        globulinUnit: globulinUnit,
        globulinRange: globulinRange,
        agRationResult: agRatioResult,
        agRationUnit: agRatioUnit,
        agrAtionRange: agRatioRange,
        oralGlucoseChallengeTestResult: oralGlucoseChallengeTestResult,
        oralGlucoseChallengeTestUnit: oralGlucoseChallengeTestUnit,
        oralGlucoseChallengeTestRange: oralGlucoseChallengeTestRange,
        fbS50Result: fiftyGramsOGTTFBSResult,
        fbS50Unit: fiftyGramsOGTTFBSUnit,
        fbS50Range: fiftyGramsOGTTFBSRange,
        firstHour50Result: fiftyGramsOGTT1stHourResult,
        firstHour50Unit: fiftyGramsOGTT1stHourUnit,
        firstHour50Range: fiftyGramsOGTT1stHourRange,
        fbS75Result: seventyFiveGramsOGTTFBSResult,
        fbS75Unit: seventyFiveGramsOGTTFBSUnit,
        fbS75Range: seventyFiveGramsOGTTFBSRange,
        firstHour75Result: seventyFiveGramsOGTT1stHourResult,
        firstHour75Unit: seventyFiveGramsOGTT1stHourUnit,
        firstHour75Range: seventyFiveGramsOGTT1stHourRange,
        secondHour75Result: seventyFiveGramsOGTT2ndHourResult,
        secondHour75Unit: seventyFiveGramsOGTT2ndHourUnit,
        secondHour75Range: seventyFiveGramsOGTT2ndHourRange,
        fbS100Result: oneHundredGramsOGTTFBSResult,
        fbS100Unit: oneHundredGramsOGTTFBSUnit,
        fbS100Range: oneHundredGramsOGTTFBSRange,
        firstHour100Result: oneHundredGramsOGTT1stHourResult,
        firstHour100Unit: oneHundredGramsOGTT1stHourUnit,
        firstHour100Range: oneHundredGramsOGTT1stHourRange,
        secondHour100Result: oneHundredGramsOGTT2ndHourResult,
        secondHour100Unit: oneHundredGramsOGTT2ndHourUnit,
        secondHour100Range: oneHundredGramsOGTT2ndHourRange,
        thirdHour100Result: oneHundredGramsOGTT3rdHourResult,
        thirdHour100Unit: oneHundredGramsOGTT3rdHourUnit,
        thirdHour100Range: oneHundredGramsOGTT3rdHourRange,
        twoHoursPostPrandialGlucoseResult: twoHoursPostPrandialGlucoseResult,
        twoHoursPostPrandialGlucoseUnit: twoHoursPostPrandialGlucoseUnit,
        twoHoursPostPrandialGlucoseRange: twoHoursPostPrandialGlucoseRange,
      },
    });
  };

  const accordionData = [
    {
      name: "Fasting Blood Sugar (FBS)",
      value: "item-1",
      title: "Fasting Blood Sugar (FBS)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">
            Fasting Blood Sugar{" "}
          </h2>
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
        </div>
      ),
    },
    {
      name: "Random Blood Sugar (RBS)",
      value: "item-2",
      title: "Random Blood Sugar (RBS)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">
            Random Blood Sugar{" "}
          </h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={RandomBloodSugarResult}
              onChange={(e) => {
                setRandomBloodSugarResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={RandomBloodSugarUnit}
              onChange={(e) => {
                setRandomBloodSugarUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={RandomBloodSugarRange}
              onChange={(e) => {
                setRandomBloodSugarRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "AMYLASE",
      value: "item-3",
      title: "Amylase",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">Amylase </h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={amylaseResult}
              onChange={(e) => {
                setAmylaseResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={amylaseUnit}
              onChange={(e) => {
                setAmylaseUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={amylaseRange}
              onChange={(e) => {
                setAmylaseRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "2HR Post-prandial Glucose",
      value: "item-4",
      title: "2HR Post-prandial Glucose",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">
            2 Hours Post - Prandial Glucose{" "}
          </h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={twoHoursPostPrandialGlucoseResult}
              onChange={(e) => {
                setTwoHoursPostPrandialGlucoseResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={twoHoursPostPrandialGlucoseUnit}
              onChange={(e) => {
                setTwoHoursPostPrandialGlucoseUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={twoHoursPostPrandialGlucoseRange}
              onChange={(e) => {
                setTwoHoursPostPrandialGlucoseRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Creatinine",
      value: "item-5",
      title: "Creatinine",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">Creatinine</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={CreatinineResult}
              onChange={(e) => {
                setCreatinineResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={CreatinineUnit}
              onChange={(e) => {
                setCreatinineUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={CreatinineRange}
              onChange={(e) => {
                setCreatinineRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Blood Urea Nitrogen (BUN)",
      value: "item-6",
      title: "Blood Urea Nitrogen (BUN)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">
            Blood Urea Nitrogen
          </h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={bloodUreaNitrogenResult}
              onChange={(e) => {
                setBloodUreaNitrogenResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={bloodUreaNitrogenUnit}
              onChange={(e) => {
                setBloodUreaNitrogenUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={bloodUreaNitrogenRange}
              onChange={(e) => {
                setBloodUreaNitrogenRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "BLOOD URIC ACID (BUA)",
      value: "item-7",
      title: "BLOOD URIC ACID (BUA)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">Uric Acid</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={uricAcidResult}
              onChange={(e) => {
                setUricAcidResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={uricAcidUnit}
              onChange={(e) => {
                setUricAcidUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={uricAcidRange}
              onChange={(e) => {
                setUricAcidRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "(SGPT/ALT)Serum Glutamic Pyruvate Transaminase/ Alanine Aminotransferase",
      value: "item-8",
      title:
        "(SGPT/ALT)Serum Glutamic Pyruvate Transaminase/ Alanine Aminotransferase",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">ALT/SGPT</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={SGPTALResult}
              onChange={(e) => {
                setSGPTALResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={SGPTALUnit}
              onChange={(e) => {
                setSGPTALUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={SGPTALRange}
              onChange={(e) => {
                setSGPTALRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "(SGOT/AST)Serum Glutamic-Oxaloacetic Transaminase/ Aspartate Aminotransferase",
      value: "item-9",
      title:
        "(SGOT/AST)Serum Glutamic-Oxaloacetic Transaminase/ Aspartate Aminotransferase",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">AST/SGOT</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ASTSGOTResult}
              onChange={(e) => {
                setASTSGOTResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ASTSGOTUnit}
              onChange={(e) => {
                setASTSGOTUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ASTSGOTRange}
              onChange={(e) => {
                setASTSGOTRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Alkaline Phosphatase (ALP)",
      value: "item-10",
      title: "Alkaline Phosphatase (ALP)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">
            Alkaline Phosphatase
          </h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={AlkalineResult}
              onChange={(e) => {
                setAlkalineResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={AlkalineUnit}
              onChange={(e) => {
                setAlkalineUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={AlkalineRange}
              onChange={(e) => {
                setAlkalineRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Calcium (Total) (TCA)",
      value: "item-11",
      title: "Calcium (Total) (TCA)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">Total Calcium</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={totalCalciumResult}
              onChange={(e) => {
                setTotalCalciumResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={totalCalciumUnit}
              onChange={(e) => {
                setTotalCalciumUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={totalCalciumRange}
              onChange={(e) => {
                setTotalCalciumRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Glycosylated Hemoglobin (HBA1C)",
      value: "item-12",
      title: "Glycosylated Hemoglobin (HBA1C)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">HBA1C</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={Hba1cResult}
              onChange={(e) => {
                setHba1cResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={Hba1cUnit}
              onChange={(e) => {
                setHba1cUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={Hba1cRange}
              onChange={(e) => {
                setHba1cRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Lipid Profile",
      value: "item-13",
      title: "Lipid Profile",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
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
        </div>
      ),
    },
    {
      name: "ELECTROLYTES PACKAGE (NA,K,CL)",
      value: "item-14",
      title: "ELECTROLYTES",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">Sodium</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={sodiumResult}
              onChange={(e) => {
                setSodiumResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={sodiumUnit}
              onChange={(e) => {
                setSodiumUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={sodiumRange}
              onChange={(e) => {
                setSodiumRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Potassium</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={potassiumResult}
              onChange={(e) => {
                setPotassiumResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={potassiumUnit}
              onChange={(e) => {
                setPotassiumUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={potassiumRange}
              onChange={(e) => {
                setPotassiumRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Chloride</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={chlorideResult}
              onChange={(e) => {
                setChlorideResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={chlorideUnit}
              onChange={(e) => {
                setChlorideUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={chlorideRange}
              onChange={(e) => {
                setChlorideRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Ionized Clacium</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ionizedCalciumResult}
              onChange={(e) => {
                setIonizedCalciumResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ionizedCalciumUnit}
              onChange={(e) => {
                setIonizedCalciumUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={ionizedCalciumRange}
              onChange={(e) => {
                setIonizedCalciumRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Bilirubin (Total)",
      value: "item-15",
      title: "BILIRUBIN PANEL",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">Total Bilirubin</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={totalBilirubinResult}
              onChange={(e) => {
                setTotalBilirubinResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={totalBilirubinUnit}
              onChange={(e) => {
                setTotalBilirubinUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={totalBilirubinRange}
              onChange={(e) => {
                setTotalBilirubinRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Direct Bilirubin</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={directBilirubinResult}
              onChange={(e) => {
                setDirectBilirubinResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={directBilirubinUnit}
              onChange={(e) => {
                setDirectBilirubinUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={directBilirubinRange}
              onChange={(e) => {
                setDirectBilirubinRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">
            Indirect Bilirubin
          </h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={indirectBilirubinResult}
              onChange={(e) => {
                setIndirectBilirubinResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={indirectBilirubinUnit}
              onChange={(e) => {
                setIndirectBilirubinUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={indirectBilirubinRange}
              onChange={(e) => {
                setIndirectBilirubinRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: ["Albumin", "Protein (Total) TP"],
      value: "item-16 ",
      title: "TPAG",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">Total Protein</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={totalProteinResult}
              onChange={(e) => {
                setTotalProteinResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={totalProteinUnit}
              onChange={(e) => {
                setTotalProteinUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={totalProteinRange}
              onChange={(e) => {
                setTotalProteinRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Albumin</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={albuminResult}
              onChange={(e) => {
                setAlbuminResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={albuminUnit}
              onChange={(e) => {
                setAlbuminUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={albuminRange}
              onChange={(e) => {
                setAlbuminRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">Globulin</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={globulinResult}
              onChange={(e) => {
                setGlobulinResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={globulinUnit}
              onChange={(e) => {
                setGlobulinUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={globulinRange}
              onChange={(e) => {
                setGlobulinRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">A/G Ratio</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={agRatioResult}
              onChange={(e) => {
                setAgRatioResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={agRatioUnit}
              onChange={(e) => {
                setAgRatioUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={agRatioRange}
              onChange={(e) => {
                setAgRatioRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Oral Glucose Tolerance Test (50) OGTT50",
      value: "item-17",
      title: "50 GRAMS OGCT",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <h2 className="text-sm text-right mt-2 w-[70%]">50 GRAMS OGCT</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oralGlucoseChallengeTestResult}
              onChange={(e) => {
                setOralGlucoseChallengeTestResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oralGlucoseChallengeTestUnit}
              onChange={(e) => {
                setOralGlucoseChallengeTestUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oralGlucoseChallengeTestRange}
              onChange={(e) => {
                setOralGlucoseChallengeTestRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Oral Glucose Tolerance Test (50) OGTT50",
      value: "item-18",
      title: "Oral Glucose Tolerance Test (50) OGTT50",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">FBS</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={fiftyGramsOGTTFBSResult}
              onChange={(e) => {
                setFiftyGramsOGTTFBSResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={fiftyGramsOGTTFBSUnit}
              onChange={(e) => {
                setFiftyGramsOGTTFBSUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={fiftyGramsOGTTFBSRange}
              onChange={(e) => {
                setFiftyGramsOGTTFBSRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">1st Hour</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={fiftyGramsOGTT1stHourResult}
              onChange={(e) => {
                setFiftyGramsOGTT1stHourResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={fiftyGramsOGTT1stHourUnit}
              onChange={(e) => {
                setFiftyGramsOGTT1stHourUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={fiftyGramsOGTT1stHourRange}
              onChange={(e) => {
                setFiftyGramsOGTT1stHourRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Oral Glucose Tolerance Test (75) OGTT75",
      value: "item-19",
      title: "Oral Glucose Tolerance Test (75) OGTT75",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">FBS</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={seventyFiveGramsOGTTFBSResult}
              onChange={(e) => {
                setSeventyFiveGramsOGTTFBSResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={seventyFiveGramsOGTTFBSUnit}
              onChange={(e) => {
                setSeventyFiveGramsOGTTFBSUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={seventyFiveGramsOGTTFBSRange}
              onChange={(e) => {
                setSeventyFiveGramsOGTTFBSRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">1st Hour</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={seventyFiveGramsOGTT1stHourResult}
              onChange={(e) => {
                setSeventyFiveGramsOGTT1stHourResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={seventyFiveGramsOGTT1stHourUnit}
              onChange={(e) => {
                setSeventyFiveGramsOGTT1stHourUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={seventyFiveGramsOGTT1stHourRange}
              onChange={(e) => {
                setSeventyFiveGramsOGTT1stHourRange(e.target.value);
              }}
            />
          </div>
          <h2 className="text-sm text-right mt-2 w-[70%]">2nd Hour</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={seventyFiveGramsOGTT2ndHourResult}
              onChange={(e) => {
                setSeventyFiveGramsOGTT2ndHourResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={seventyFiveGramsOGTT2ndHourUnit}
              onChange={(e) => {
                setSeventyFiveGramsOGTT2ndHourUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={seventyFiveGramsOGTT2ndHourRange}
              onChange={(e) => {
                setSeventyFiveGramsOGTT2ndHourRange(e.target.value);
              }}
            />
          </div>
        </div>
      ),
    },
    {
      name: "Oral Glucose Tolerance Test (75) OGTT75",
      value: "item-20",
      title: "Oral Glucose Tolerance Test (75) OGTT75",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">FBS</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTTFBSResult}
              onChange={(e) => {
                setOneHundredGramsOGTTFBSResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTTFBSUnit}
              onChange={(e) => {
                setOneHundredGramsOGTTFBSUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTTFBSRange}
              onChange={(e) => {
                setOneHundredGramsOGTTFBSRange(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right mt-2 w-[70%]">1st Hour</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTT1stHourResult}
              onChange={(e) => {
                setOneHundredGramsOGTT1stHourResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTT1stHourUnit}
              onChange={(e) => {
                setOneHundredGramsOGTT1stHourUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTT1stHourRange}
              onChange={(e) => {
                setOneHundredGramsOGTT1stHourRange(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right mt-2 w-[70%]">2nd Hour</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTT2ndHourResult}
              onChange={(e) => {
                setOneHundredGramsOGTT2ndHourResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTT2ndHourUnit}
              onChange={(e) => {
                setOneHundredGramsOGTT2ndHourUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTT2ndHourRange}
              onChange={(e) => {
                setOneHundredGramsOGTT2ndHourRange(e.target.value);
              }}
            />
          </div>

          <h2 className="text-sm text-right mt-2 w-[70%]">3rd Hour</h2>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTT3rdHourResult}
              onChange={(e) => {
                setOneHundredGramsOGTT3rdHourResult(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTT3rdHourUnit}
              onChange={(e) => {
                setOneHundredGramsOGTT3rdHourUnit(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={oneHundredGramsOGTT3rdHourRange}
              onChange={(e) => {
                setOneHundredGramsOGTT3rdHourRange(e.target.value);
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
              No Chemistry tests found for this patient.
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
