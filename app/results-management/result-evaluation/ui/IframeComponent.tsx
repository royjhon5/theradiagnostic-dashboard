import React, { useMemo, useState, useEffect } from "react";
import { useMainContext } from "../context/context-provider";
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
  hemaId: "generate-hematology-review",
  immuId: "generate-immunology-review",
  clinicId: "generate-clinicalmicroscopy-review",
  chemId: "generate-chemistry-review",
  serologyId: "generate-serology-review",
  serologyHIVId: "generate-serologyHIV-review",
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
    setLoading(true);
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
  const iframeUrl = `https://localhost:7188/laboratoryResults/${currentEndpoint}/${clientId}#toolbar=0`;

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium capitalize">
          {currentKey.replace("Id", "").replace(/([a-z])([A-Z])/g, "$1 $2")} (
          {pageIndex + 1}/{availableEndpoints.length})
        </span>
        <button
          onClick={() =>
            setPageIndex((prev) =>
              Math.min(prev + 1, availableEndpoints.length - 1)
            )
          }
          disabled={pageIndex === availableEndpoints.length - 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="relative h-[700px] w-full border rounded overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10">
            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
            <span className="mt-2 text-gray-600 text-sm">Loading PDF...</span>
          </div>
        )}
        <iframe
          src={iframeUrl}
          width="100%"
          height="700px"
          title="Lab PDF"
          onLoad={() => setLoading(false)}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
