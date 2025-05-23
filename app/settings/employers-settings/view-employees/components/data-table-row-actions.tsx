import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { getEmployersByIdData } from "../../schema/schema";
import { useMainContext } from "../../context/context-provider";

interface DataTableRowActionsProps {
  row: Row<getEmployersByIdData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setEmployeesCurrentRow } = useMainContext();
  const router = useRouter();
  return (
    <div className="flex flex-row gap-2 justify-end">
      <>
        <Button
          size="sm"
          className="cursor-pointer bg-green-500"
          onClick={() => {
            const encoded = encodeURIComponent(JSON.stringify(row.original));
            router.push(
              `/settings/employers-settings/edit-employer?data=${encoded}`
            );
          }}
        >
          <Edit /> Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="cursor-pointer"
          onClick={() => {
            setEmployeesCurrentRow(row.original);
          }}
        >
          <Trash /> Delete
        </Button>
      </>
    </div>
  );
}
