import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-1 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Filter Test Name"
          value={
            (table
              .getColumn("discountDescription")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("discountDescription")
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] bg-background"
        />
        {/* <div className="flex gap-x-2">
          {table.getColumn("signatoryPosition") && (
            <DataTableFacetedFilter
              column={table.getColumn("signatoryPosition")}
              title="Signatory Position"
              options={signatoryPositionData}
            />
          )}
        </div> */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={() => router.push("/settings/discount/add-discount")}
      >
        <Plus />
        <span className="hidden lg:inline">Add Discount</span>
      </Button>
    </div>
  );
}
