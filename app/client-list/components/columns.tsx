import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./table-header";
import { DataTableRowActions } from "./table-row-actions";
import { globalClientData } from "../schema";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

export const DataColumns: ColumnDef<globalClientData>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-row gap-4 items-center">
        <div>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="flex flex-row gap-1">
            <div>{row.original.firstName}</div>
            <div>{row.original.middleName}</div>
            <div>{row.original.lastName}</div>
          </div>
          <div>{row.original.currentAddress}</div>
        </div>
      </div>
    ),
    meta: { className: "w-50" },
    enableHiding: false,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <div>{row.original.gender}</div>,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
