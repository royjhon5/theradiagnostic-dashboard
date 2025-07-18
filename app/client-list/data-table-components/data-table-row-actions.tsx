import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Archive, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMainContext } from "../context/context-provider";
import { globalGetClientData } from "../schema";
import {
  generateMedicalReportPdf,
  reprintOr,
} from "@/app/api/services/client.api";

interface DataTableRowActionsProps {
  row: Row<globalGetClientData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useMainContext();
  const router = useRouter();
  return (
    <div className="flex flex-row gap-2 justify-end">
      <>
        <Button
          size="sm"
          className="cursor-pointer bg-yellow-500"
          onClick={() => {
            reprintOr(Number(row.original.id));
          }}
        >
          Reprint OR
        </Button>
        <Button
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            generateMedicalReportPdf(Number(row.original.id));
          }}
        >
          Generate APE
        </Button>
        <Button
          size="sm"
          className="cursor-pointer bg-green-500"
          onClick={() => {
            const encoded = encodeURIComponent(JSON.stringify(row.original));
            router.push(`/client-list/edit-client?data=${encoded}`);
          }}
        >
          <Edit /> Edit
        </Button>
        <Button
          size="sm"
          className="cursor-pointer bg-red-500"
          onClick={() => {
            setCurrentRow(row.original);
            setOpen("delete");
          }}
        >
          <Archive /> Delete
        </Button>
      </>
    </div>
  );
}
