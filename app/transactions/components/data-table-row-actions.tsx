import { Row } from "@tanstack/react-table";
import { GlobalData } from "../data/schema";
import { Button } from "@/components/ui/button";
import { Eye, FolderSync, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps {
  row: Row<GlobalData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-2 justify-end">
      {row.original.status === "pending" ? (
        <>
          <Button
            size="sm"
            className="cursor-pointer bg-[#737373] hover:bg-[#737373]"
            onClick={() => {
              const encoded = encodeURIComponent(JSON.stringify(row.original));
              router.push(`/transactions/transaction-details?data=${encoded}`);
            }}
          >
            <Eye /> View
          </Button>
          <Button
            size="sm"
            className="cursor-pointer bg-[#737373] hover:bg-[#737373]"
            onClick={() => {
              const encoded = encodeURIComponent(JSON.stringify(row.original));
              router.push(`/transactions/process-transaction?data=${encoded}`);
            }}
          >
            <FolderSync /> Process
          </Button>
          <Button
            size="sm"
            className="cursor-pointer bg-[#737373] hover:bg-[#737373]"
          >
            <X /> Cancel
          </Button>
        </>
      ) : row.original.status === "completed" ? (
        <Button
          size="sm"
          className="cursor-pointer bg-[#737373] hover:bg-[#737373]"
          onClick={() => {
            const encoded = encodeURIComponent(JSON.stringify(row.original));
            router.push(`/transactions/transaction-details?data=${encoded}`);
          }}
        >
          <Eye /> View
        </Button>
      ) : (
        <Button
          size="sm"
          className="cursor-pointer bg-[#737373] hover:bg-[#737373]"
          onClick={() => {
            const encoded = encodeURIComponent(JSON.stringify(row.original));
            router.push(`/transactions/transaction-details?data=${encoded}`);
          }}
        >
          <Eye /> View
        </Button>
      )}
    </div>
  );
}
