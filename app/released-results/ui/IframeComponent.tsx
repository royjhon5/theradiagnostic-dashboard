import React, { useMemo, useState, useEffect } from "react";
import { useMainContext } from "../context/context-provider";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";

type ResultKey =
  | "hemaId"
  | "immuId"
  | "clinicId"
  | "chemId"
  | "serologyId"
  | "serologyHIVId";

const endpointMap: Record<ResultKey, string> = {
  hemaId: "generate-hematology-result",
  immuId: "generate-immunology-result",
  clinicId: "generate-clinicalmicroscopy-result",
  chemId: "generate-chemistry-result",
  serologyId: "generate-serology-result",
  serologyHIVId: "generate-serologyHIV-result",
};

const resultKeys: ResultKey[] = [
  "hemaId",
  "immuId",
  "clinicId",
  "chemId",
  "serologyId",
  "serologyHIVId",
];

export default function IframeComponent() {
  const { currentRow } = useMainContext();
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = Cookies.get("user");
  const role = user ? JSON.parse(user).role : null;

  const availableEndpoints = useMemo(() => {
    if (!currentRow) return [];

    return resultKeys.filter((key) => {
      if (key === "serologyHIVId" && role !== "ADMIN") return false;
      return !!currentRow[key];
    });
  }, [currentRow, role]);

  useEffect(() => {
    setPageIndex(0);
  }, [currentRow]);

  useEffect(() => {
    setLoading(true); // reset loading when endpoint changes
  }, [pageIndex, currentRow]);

  if (!currentRow || !currentRow.clientId || availableEndpoints.length === 0) {
    return (
      <div className="flex flex-col justify-center align-center items-center mt-15">
        <p className="text-center text-gray-500">
          Select Client to view result
        </p>
      </div>
    );
  }

  const currentKey = availableEndpoints[pageIndex];
  const currentEndpoint = endpointMap[currentKey];
  const clientId = currentRow.clientId;
  const iframeUrl = `http://192.168.1.26:80/laboratoryResults/${currentEndpoint}/${clientId}`;

  return (
    <div className="p-2 relative">
      <div className="flex justify-between items-center mb-2">
        <Button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
          className="px-3 py-1 cursor-pointer"
        >
          Previous
        </Button>
        <span className="font-medium capitalize">
          {currentKey.replace("Id", "").replace(/([a-z])([A-Z])/g, "$1 $2")} (
          {pageIndex + 1}/{availableEndpoints.length})
        </span>
        <Button
          onClick={() =>
            setPageIndex((prev) =>
              Math.min(prev + 1, availableEndpoints.length - 1)
            )
          }
          disabled={pageIndex === availableEndpoints.length - 1}
          className="px-3 py-1 cursor-pointer"
        >
          Next
        </Button>
      </div>

      <div className="relative h-[600px] w-full">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
            <span className="ml-2 text-gray-600">Loading PDF...</span>
          </div>
        )}
        <iframe
          src={iframeUrl}
          width="100%"
          height="600px"
          title="Lab PDF"
          className="border w-full"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
