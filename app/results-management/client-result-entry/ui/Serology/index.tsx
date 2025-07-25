import { createSerology } from "@/app/api/services/laboratoryresult.api";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { Button } from "@/components/ui/button";
import { BaseResponseType } from "@/types/BaseResponse";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useMainContext } from "../../context/context-provider";
import Cookies from "js-cookie";
import { CreatableCombobox } from "@/components/creatable-combobox";
import { Input } from "@/components/ui/input";
import {
  AntiHavIgGRemarksOption,
  AntiHcvRemarksOption,
  HbsagRemarksOption,
  nitriteOption,
  reactiveAndNonOption,
  serologyMethod,
  SyphiilisRemarksOption,
} from "../../data/data";
import { ReusableAccordion } from "@/components/custom-accordion";
import useGetCart from "@/app/client-registration/hooks/useGetCart";

export default function SerologyComponent() {
  const { currentRow } = useMainContext();
  const { testNameMergeOnly } = useGetCart(
    currentRow ? Number(currentRow.id) : 0
  );
  const [hbsAgResult, setHbsAgResult] = useState("");
  const [hbsAgMethod, setHbsAgMethod] = useState("");
  const [hbsAgRemarks, setHbsAgRemarks] = useState("");

  const [antiHcvResult, setAntiHcvResult] = useState("");
  const [antiHcvMethod, setAntiHcvMethod] = useState("");
  const [antiHcvRemarks, setAntiHcvRemarks] = useState("");

  const [antiHavIggResult, setAntiHavIggResult] = useState("");
  const [antiHavIggMethod, setAntiHavIggMethod] = useState("");
  const [antiHavIggRemarks, setAntiHavIggRemarks] = useState("");

  const [antiHavIgMResult, setAntiHavIgMResult] = useState("");
  const [antiHavIgMMethod, setAntiHavIgMMethod] = useState("");
  const [antiHavIgMRemarks, setAntiHavIgMRemarks] = useState("");

  const [syphilisResult, setSyphilisResult] = useState("");
  const [syphilisMethod, setSyphilisMethod] = useState("");
  const [syphilisRemarks, setSyphilisRemarks] = useState("");

  const [urineHcgResult, setUrineHcgResult] = useState("");
  const [urineHcgMethod, setUrineHcgMethod] = useState("");

  const [nsiResult, setNsiResult] = useState("");
  const [nsiMethod, setNsiMethod] = useState("");

  const [iggResult, setIggResult] = useState("");
  const [iggMethod, setIggMethod] = useState("");

  const [igmResult, setIgmResult] = useState("");
  const [igmMethod, setIgmMethod] = useState("");

  const [antiHbsResult, setAntiHbsResult] = useState("");
  const [antiHbsMethod, setAntiHbsMethod] = useState("");

  const [salmonellaIggResult, setSalmonellaIggResult] = useState("");
  const [salmonellaIggMethod, setSalmonellaIggMethod] = useState("");

  const [salmonellaIgmResult, setSalmonellaIgmResult] = useState("");
  const [salmonellaIgmMethod, setSalmonellaIgmMethod] = useState("");

  const { setLoading } = useAppLoaderContext();
  const { mutate } = useMutation({
    mutationFn: createSerology,
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
      serology: {
        antiHCVScreeningResult: antiHcvResult,
        antiHCVScreeningRemarks: antiHcvRemarks,
        antiHCVScreeningMethod: antiHcvMethod,
        antiHavIgGScreeningResult: antiHavIggResult,
        antiHavIgGScreeningRemarks: antiHavIggRemarks,
        antiHavIgGScreeningMethod: antiHavIggMethod,
        vdrlSyphilisResult: syphilisResult,
        vdrlSyphilisRemarks: syphilisRemarks,
        vdrlSyphilisMethod: syphilisMethod,
        hBsAgScreeningResult: hbsAgResult,
        hBsAgScreeningRemarks: hbsAgRemarks,
        hBsAgScreeningMethod: hbsAgMethod,
        antiHavIgMScreeningResult: antiHavIgMResult,
        antiHavIgMScreeningRemarks: antiHavIgMRemarks,
        antiHavIgMScreeningMethod: antiHavIgMMethod,
        nsOneResult: nsiResult,
        nsOneMethod: nsiMethod,
        igGResult: iggResult,
        igGMethod: iggMethod,
        igMResult: igmResult,
        igMMethod: igmMethod,
        serumHCGResult: urineHcgResult,
        salmonellaIgGResult: salmonellaIggResult,
        salmonellaIgGUnit: salmonellaIggMethod,
        salmonellaIgMResult: salmonellaIgmResult,
        salmonellaIgMMethod: salmonellaIgmMethod,
        antiHBSResult: antiHbsResult,
        antiHBSMethod: antiHbsMethod,
        serumPlasmaHCGResult: urineHcgResult,
        serumPlasmaHCGMethod: urineHcgMethod,
      },
    });
  };

  const accordionData = [
    {
      name: "HBSAg Kit",
      value: "item-1",
      title: "HBSAg (HEPB)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">HBsAg</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={reactiveAndNonOption}
              value={hbsAgResult}
              onChange={setHbsAgResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={hbsAgMethod}
              onChange={setHbsAgMethod}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <h2 className="text-sm text-right mt-2 w-[70%]"></h2>
          <div className="col-span-3 mt-2 ml-8 mb-2">
            <CreatableCombobox
              options={HbsagRemarksOption}
              value={hbsAgRemarks}
              onChange={setHbsAgRemarks}
              placeholder="Remarks"
            />
          </div>
        </div>
      ),
    },
    {
      name: "Hep C Kit",
      value: "item-2",
      title: "ANTI-HCV",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">
            Anti - HCV Screening
          </h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={reactiveAndNonOption}
              value={antiHcvResult}
              onChange={setAntiHcvResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={antiHcvMethod}
              onChange={setAntiHcvMethod}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <h2 className="text-sm text-right mt-2 w-[70%]"></h2>
          <div className="col-span-3 mt-2 ml-8 mb-2">
            <CreatableCombobox
              options={AntiHcvRemarksOption}
              value={antiHcvRemarks}
              onChange={setAntiHcvRemarks}
              placeholder="Remarks"
            />
          </div>
        </div>
      ),
    },
    {
      name: "HAV Kit",
      value: "item-3",
      title: "ANTI-HAV IgG",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">
            Anti - HAV IgG Screening
          </h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={reactiveAndNonOption}
              value={antiHavIggResult}
              onChange={setAntiHavIggResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={antiHavIggMethod}
              onChange={setAntiHavIggMethod}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <h2 className="text-sm text-right mt-2 w-[70%]"></h2>
          <div className="col-span-3 mt-2 ml-8 mb-2">
            <CreatableCombobox
              options={AntiHavIgGRemarksOption}
              value={antiHavIggRemarks}
              onChange={setAntiHavIggRemarks}
              placeholder="Remarks"
            />
          </div>
        </div>
      ),
    },
    {
      name: "Syphilis Kit",
      value: "item-4",
      title: "SYPHILIS (VDRL)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">VDRL / Syphilis</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={reactiveAndNonOption}
              value={syphilisResult}
              onChange={setSyphilisResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={syphilisMethod}
              onChange={setSyphilisMethod}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <h2 className="text-sm text-right mt-2 w-[70%]"></h2>
          <div className="col-span-3 mt-2 ml-8 mb-2">
            <CreatableCombobox
              options={SyphiilisRemarksOption}
              value={syphilisRemarks}
              onChange={setSyphilisRemarks}
              placeholder="Remarks"
            />
          </div>
        </div>
      ),
    },
    {
      name: "HAV Kit",
      value: "item-5",
      title: "ANTI-HAV IgM",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">
            Anti - HAV IgM Screening
          </h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={reactiveAndNonOption}
              value={antiHavIgMResult}
              onChange={setAntiHavIgMResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={antiHavIgMMethod}
              onChange={setAntiHavIgMMethod}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center"></div>
          <h2 className="text-sm text-right mt-2 w-[70%]"></h2>
          <div className="col-span-3 mt-2 ml-8 mb-2">
            <CreatableCombobox
              options={AntiHavIgGRemarksOption}
              value={antiHavIgMRemarks}
              onChange={setAntiHavIgMRemarks}
              placeholder="Remarks"
            />
          </div>
        </div>
      ),
    },
    {
      name: "Dengue Duo Kit",
      value: "item-6",
      title: "DENGUE DUO",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">NS1</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={reactiveAndNonOption}
              value={nsiResult}
              onChange={setNsiResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={nsiMethod}
              onChange={setNsiMethod}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center"></div>

          <h2 className="text-sm text-right mt-2 w-[70%]">IgG</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={reactiveAndNonOption}
              value={iggResult}
              onChange={setIggResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={iggMethod}
              onChange={setIggMethod}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center"></div>

          <h2 className="text-sm text-right mt-2 w-[70%]">IgM</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={reactiveAndNonOption}
              value={igmResult}
              onChange={setIgmResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={igmMethod}
              onChange={setIgmMethod}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center"></div>
        </div>
      ),
    },
    {
      name: "PREGNANCY TEST (SERUM) PT",
      value: "item-7",
      title: "PREGNANCY TEST",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">
            SERUM / PLASMA HCG
          </h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={nitriteOption}
              value={urineHcgResult}
              onChange={setUrineHcgResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <Input
              className="w-[80%]"
              value={urineHcgMethod}
              onChange={(e) => {
                setUrineHcgMethod(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center items-center"></div>
        </div>
      ),
    },
    {
      name: "Hepatitis B virus",
      value: "item-8",
      title: "Anti-HBS (Qualitative)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">Anti-HBS</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={nitriteOption}
              value={antiHbsResult}
              onChange={setAntiHbsResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={antiHbsMethod}
              onChange={setAntiHbsMethod}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center"></div>
        </div>
      ),
    },
    {
      name: "SALMONELLA TYPE (TYPHIDOT)",
      value: "item-9",
      title: "SALMONELLA TYPE (TYPHIDOT)",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <h2 className="text-sm text-right mt-2 w-[70%]">IgG</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={reactiveAndNonOption}
              value={salmonellaIggResult}
              onChange={setSalmonellaIggResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={salmonellaIggMethod}
              onChange={setSalmonellaIggMethod}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center"></div>

          <h2 className="text-sm text-right mt-2 w-[70%]">IgM</h2>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={reactiveAndNonOption}
              value={salmonellaIgmResult}
              onChange={setSalmonellaIgmResult}
              placeholder=""
            />
          </div>
          <div className="flex justify-center items-center">
            <CreatableCombobox
              options={serologyMethod}
              value={salmonellaIgmMethod}
              onChange={setSalmonellaIgmMethod}
              placeholder=""
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
          Method
        </h2>
        <h2 className="text-center font-bold bg-blue-500 text-white p-1 rounded-tr-xl"></h2>
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
              No Serology tests found for this patient.
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
