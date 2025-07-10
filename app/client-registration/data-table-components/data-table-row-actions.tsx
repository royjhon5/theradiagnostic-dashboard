import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { globalGetClientData } from "@/app/client-list/schema";
import { useMainContext } from "@/app/client-list/context/context-provider";

interface DataTableRowActionsProps {
  row: Row<globalGetClientData>;
  onClose: () => void;
}

export function DataTableRowActions({
  row,
  onClose,
}: DataTableRowActionsProps) {
  const { setCurrentRow } = useMainContext();
  return (
    <div className="flex flex-row gap-2 justify-end">
      <>
        <Button
          className="cursor-pointer"
          onClick={() => {
            setCurrentRow(row.original);
            onClose();
          }}
        >
          Select
        </Button>
      </>
    </div>
  );
}
