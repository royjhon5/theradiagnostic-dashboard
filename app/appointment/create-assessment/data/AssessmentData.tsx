"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RedioGroupReusable from "@/components/radiogroup-reusable";
import { useState } from "react";
import defaultData from "../schema/schema";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function AssessmentData() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.get("data");
  const [fieldData, setFieldData] = useState(defaultData);
  console.log(fieldData);

  let currentRow: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

  if (raw) {
    try {
      const decoded = decodeURIComponent(raw);
      currentRow = JSON.parse(decoded);
    } catch (error) {
      console.error("Error parsing row data:", error);
    }
  }

  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 flex flex-col gap-3 mt-4">
      <div className="col-span-4">
        <div className="w-full justify-end flex items-center">
          <h1 className="text-xs font-bold italic mb-1">
            {/* Package ID : 0001-256-6{" "} */}
          </h1>
        </div>
        <div className="bg-background p-2 border-l rounded-lg border-primary shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            {/* Avatar */}
            <div className="flex flex-row gap-2 items-center">
              <Avatar className="w-15 h-15">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CNs</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <p style={{ fontSize: 10 }}>Client name</p>
                <p className="text-md font-bold">{currentRow.client_name}</p>
                <p className="text-sm">Client ID: {currentRow.priority_no}</p>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col md:text-right">
              <p style={{ fontSize: 10 }}>Assess By: Nate Diaz</p>
              <p className="text-md font-bold">{formattedDate}</p>
              <p style={{ fontSize: 10 }}>Date of Assessment</p>
            </div>
          </div>
        </div>
        {/* input fields */}
        <div className="bg-background rounded-lg shadow-sm mt-4 p-2">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            defaultChecked
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="cursor-pointer">
                MEDICAL HISTORY
              </AccordionTrigger>
              <AccordionContent className="pl-2 pr-2">
                <div className="flex gap-5 font-bold">
                  <div className="w-50">PAST MEDICAL HISTORY</div>
                  <div className="w-20 text-center">YES</div>
                  <div className="w-20 text-center">NO</div>
                  <div className="flex-1">REMARKS</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <RedioGroupReusable
                      label="Heent"
                      value={fieldData.heent}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          heent: value,
                        }))
                      }
                      inputValue={fieldData.heentRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          heentRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Asthma"
                      value={fieldData.asthma}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          asthma: value,
                        }))
                      }
                      inputValue={fieldData.asthmaRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          asthmaRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Tuberculosis"
                      value={fieldData.tuberculosis}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          tuberculosis: value,
                        }))
                      }
                      inputValue={fieldData.tuberculosisRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          tuberculosisRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Diabetes Mellitus"
                      value={fieldData.diabetesMellitus}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          diabetesMellitus: value,
                        }))
                      }
                      inputValue={fieldData.diabetesMellitusRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          diabetesMellitusRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Thyroid Disease"
                      value={fieldData.thyroidDisease}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          thyroidDisease: value,
                        }))
                      }
                      inputValue={fieldData.thyroidDiseaseRemark || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          thyroidDiseaseRemark: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Hypertension"
                      value={fieldData.hyperTension}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          hyperTension: value,
                        }))
                      }
                      inputValue={fieldData.hyperTensionRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          hyperTensionRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Heart Disease"
                      value={fieldData.heartDisease}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          heartDisease: value,
                        }))
                      }
                      inputValue={fieldData.heartDiseaseRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          heartDiseaseRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="GI Disease"
                      value={fieldData.GIDisease}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          GIDisease: value,
                        }))
                      }
                      inputValue={fieldData.GIDiseaseRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          GIDiseaseRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Hernia"
                      value={fieldData.Hernia}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          Hernia: value,
                        }))
                      }
                      inputValue={fieldData.HerniaRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          HerniaRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Kidney Disease"
                      value={fieldData.kidneyDisease}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          kidneyDisease: value,
                        }))
                      }
                      inputValue={fieldData.kidneyDiseaseRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          kidneyDiseaseRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Infectious Disease"
                      value={fieldData.infectiousDisease}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          infectiousDisease: value,
                        }))
                      }
                      inputValue={fieldData.infectiousDiseaseRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          infectiousDiseaseRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="STD"
                      value={fieldData.STD}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          STD: value,
                        }))
                      }
                      inputValue={fieldData.STDRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          STDRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Tumor/Cancer"
                      value={fieldData.tumorCancer}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          tumorCancer: value,
                        }))
                      }
                      inputValue={fieldData.tumorCancerRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          tumorCancerRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Allergies"
                      value={fieldData.allergies}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          allergies: value,
                        }))
                      }
                      inputValue={fieldData.allergiesRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          allergiesRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Hospitalization"
                      value={fieldData.hospitalization}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          hospitalization: value,
                        }))
                      }
                      inputValue={fieldData.hospitalizationRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          hospitalizationRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Operation"
                      value={fieldData.operations}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          operations: value,
                        }))
                      }
                      inputValue={fieldData.operationsRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          operationsRemarks: inputValue,
                        }))
                      }
                    />
                  </div>
                  <div className="p-2">
                    <div className="flex flex-row gap-5 mb-2">
                      <Input placeholder="Current Medication:" />
                      <Input placeholder="Others:" />
                    </div>
                    <Separator className="mb-5 mt-5" />
                    <div className="flex gap-5 font-bold">
                      <div className="w-50">FAMILY HISTORY</div>
                      <div className="w-20 text-center">YES</div>
                      <div className="w-20 text-center">NO</div>
                      <div className="flex-1">REMARKS</div>
                    </div>

                    <RedioGroupReusable
                      label="HPN/Heart Disease"
                      value={fieldData.HPNHeartDisease}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          HPNHeartDisease: value,
                        }))
                      }
                      inputValue={fieldData.HPNHeartDiseaseRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          HPNHeartDiseaseRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Diabetes Mellitus"
                      value={fieldData.FamHisDiabetesMellitus}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          FamHisDiabetesMellitus: value,
                        }))
                      }
                      inputValue={fieldData.FamHisDiabetesMellitusRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          FamHisDiabetesMellitusRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Thyroid Disease"
                      value={fieldData.FamHisthyroidDisease}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          FamHisthyroidDisease: value,
                        }))
                      }
                      inputValue={fieldData.FamHisthyroidDiseaseRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          FamHisthyroidDiseaseRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Asthma"
                      value={fieldData.FamHisAsthma}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          FamHisAsthma: value,
                        }))
                      }
                      inputValue={fieldData.FamHisAsthmaRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          FamHisAsthmaRemarks: inputValue,
                        }))
                      }
                    />

                    <RedioGroupReusable
                      label="Cancer"
                      value={fieldData.FamHisCancer}
                      onValueChange={(value) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          FamHisCancer: value,
                        }))
                      }
                      inputValue={fieldData.FamHisCancerRemarks || ""}
                      onInputChange={(inputValue) =>
                        setFieldData((prev: typeof fieldData) => ({
                          ...prev,
                          FamHisCancerRemarks: inputValue,
                        }))
                      }
                    />
                    <Separator className="mb-2 mt-2" />
                    <div className="flex gap-5 font-bold">
                      <div className="w-50">PERSONAL/SOCIAL HISTORY</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="col-span-2">
                        <Input
                          placeholder="Smoker:"
                          value={fieldData.Smoker}
                          onChange={(e) =>
                            setFieldData((prev) => ({
                              ...prev,
                              Smoker: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Input
                        placeholder="Stick/day:"
                        value={fieldData.stickPerDay}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            stickPerDay: Number(e.target.value),
                          }))
                        }
                      />
                      <Input
                        placeholder="Years"
                        value={fieldData.Years}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            Years: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                      <div className="col-span-2">
                        <Input
                          placeholder="Alcoholic Beverage Drinker:"
                          value={fieldData.AlcoholicBevDrinker}
                          onChange={(e) =>
                            setFieldData((prev) => ({
                              ...prev,
                              AlcoholicBevDrinker: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Input
                        placeholder="Bottles:"
                        value={fieldData.Bottles}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            Bottles: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="gap-3 mt-2">
                      <Input
                        placeholder="Illicit drug use:"
                        value={fieldData.AlcoholicBevDrinker}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            AlcoholicBevDrinker: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <Separator className="mb-2 mt-2" />
                    <div className="flex gap-5 font-bold">
                      <div className="w-50">OB-GYNE HISTORY</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                      <div className="col-span-1">
                        <Input
                          placeholder="LMP:"
                          value={fieldData.LMP}
                          onChange={(e) =>
                            setFieldData((prev) => ({
                              ...prev,
                              LMP: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Input
                        placeholder="PMP:"
                        value={fieldData.PMP}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            PMP: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                      <Input
                        placeholder="Menarche:"
                        value={fieldData.Menarche}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            Menarche: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Interval:"
                        value={fieldData.Interval}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            Interval: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Duration:"
                        value={fieldData.Duration}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            Duration: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                      <Input
                        placeholder="OB Score:"
                        value={fieldData.OBScore}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            OBScore: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="G:"
                        value={fieldData.G}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            G: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="P:"
                        value={fieldData.P}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            P: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                      <Input
                        placeholder="NSD:"
                        value={fieldData.NSD}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            NSD: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="CS:"
                        value={fieldData.CS}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            CS: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Complications:"
                        value={fieldData.Complications}
                        onChange={(e) =>
                          setFieldData((prev) => ({
                            ...prev,
                            Complications: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="cursor-pointer">
                PHYSICAL EXAMINATION
              </AccordionTrigger>
              <AccordionContent className="pl-2 pr-2">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="cursor-pointer">
                RECOMMENDATION
              </AccordionTrigger>
              <AccordionContent className="pl-2 pr-2">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="cursor-pointer">
                CLASSIFICATION
              </AccordionTrigger>
              <AccordionContent className="pl-2 pr-2">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 gap-2">
          <Link href={"/appointment"}>
            <Button className="cursor-pointer" size="lg">
              <ArrowLeft /> Go Back
            </Button>
          </Link>
          <div className="flex flex-row gap-2">
            <Button
              className="bg-[#66C87B] cursor-pointer"
              size="lg"
              onClick={() => {
                const encoded = encodeURIComponent(JSON.stringify(currentRow));
                router.push(
                  `/appointment/laboratory-testing?labtest=${encoded}`
                );
              }}
            >
              <ArrowRight /> Proceed Lab Test
            </Button>
            <Button className="bg-[#11C7BC] cursor-pointer" size="lg">
              <Save /> Save Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
