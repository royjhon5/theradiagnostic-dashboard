import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Archive, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMainContext } from "../context/context-provider";
import { globalLabTestData } from "../schema";

interface DataTableRowActionsProps {
  row: Row<globalLabTestData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useMainContext();
  const router = useRouter();
  return (
    <div className="flex flex-row gap-2 justify-end">
      <>
        <Button
          size="sm"
          className="cursor-pointer bg-green-500"
          onClick={() => {
            const encoded = encodeURIComponent(JSON.stringify(row.original));
            router.push(`/settings/laboratory-test/edit-test?data=${encoded}`);
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
