import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { globalClientData } from "../schema/schema";
import { useMainContext } from "../context/context-provider";

interface DataTableRowActionsProps {
  row: Row<globalClientData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setCurrentRow } = useMainContext();
  return (
    <div className="flex flex-row gap-2 justify-end">
      <>
        <Button
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            setCurrentRow(row.original);
          }}
        >
          Select
        </Button>
      </>
    </div>
  );
}
