import React, { useMemo, useState, useEffect } from "react";
import { useMainContext } from "../context/context-provider";
import Iframe from "react-iframe";
type ResultKey = "hemaId" | "immuId" | "clinicId" | "chemId";
const endpointMap: Record<ResultKey, string> = {
  hemaId: "generate-hematology-result",
  immuId: "generate-immunology-result",
  clinicId: "generate-clinicalmicroscopy-result",
  chemId: "generate-chemistry-result",
};
const resultKeys: ResultKey[] = ["hemaId", "immuId", "clinicId", "chemId"];

export default function IframeComponent() {
  const { currentRow } = useMainContext();
  const availableEndpoints = useMemo(() => {
    if (!currentRow) return [];
    return resultKeys.filter((key) => !!currentRow[key]);
  }, [currentRow]);

  const [pageIndex, setPageIndex] = useState(0);
  useEffect(() => {
    setPageIndex(0);
  }, [currentRow]);
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
  const iframeUrl = `https://localhost:7188/laboratoryResults/${currentEndpoint}/${clientId}`;
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
          {currentKey.replace("Id", "")} ({pageIndex + 1}/
          {availableEndpoints.length})
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

      <Iframe url={iframeUrl} width="100%" height="600px" title="Lab PDF" />
    </div>
  );
}
