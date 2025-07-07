import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { globalGetClientData } from "@/app/client-list/schema";

interface DataTableRowActionsProps {
  row: Row<globalGetClientData>;
}

export function DataTableRowActions({}: DataTableRowActionsProps) {
  return (
    <div className="flex flex-row gap-2 justify-end">
      <>
        <Button>Select</Button>
      </>
    </div>
  );
}
