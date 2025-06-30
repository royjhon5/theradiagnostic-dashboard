import { useMainContext } from "../context/context-provider";
import Iframe from "react-iframe";
export default function IframeComponent() {
  const { currentRow } = useMainContext();
  const PDF =
    "https://localhost:7188/laboratoryResults/generate-hematology-result/8";
  return (
    <div className="p-2 ">
      <div>
        <Iframe
          url={PDF + "#toolbar=0"}
          width="100%"
          height="600px"
          title="Hematology PDF"
        />
      </div>
    </div>
  );
}
