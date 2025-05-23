import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { getEmployersByIdData } from "../../schema/schema";

export const columns: ColumnDef<getEmployersByIdData>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "currentAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Current Address" />
    ),
    cell: ({ row }) => <div>{row.getValue("currentAddress")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
