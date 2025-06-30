import { Row } from "@tanstack/react-table";
import { globalClientForReviewData } from "../schema/schema";
import { Button } from "@/components/ui/button";
import { useMainContext } from "../context/context-provider";

interface DataTableRowActionsProps {
  row: Row<globalClientForReviewData>;
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
            const idsToCheck = ["chemId", "hemaId", "clinicId", "immuId"];
            const availableData = idsToCheck.reduce(
              (acc, key) => {
                const value = row.original[key as keyof typeof row.original];
                if (typeof value === "number" && value !== 0) {
                  acc[key] = value;
                }
                return acc;
              },
              {} as Record<string, number>
            );
            setCurrentRow(availableData);
          }}
        >
          View Result
        </Button>
      </>
    </div>
  );
}
