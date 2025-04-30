import { ColumnDef } from "@tanstack/react-table";
import { GlobalData } from "../data/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<GlobalData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "client_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("client_id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "client_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("client_name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transaction_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Date" />
    ),
    cell: ({ row }) => <div>{row.getValue("transaction_date")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "amount_in_php",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => <div>₱ {row.getValue("amount_in_php")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        className={
          row.getValue("status") === "pending"
            ? "bg-blue-500 "
            : row.getValue("status") === "completed"
              ? "bg-green-500"
              : "bg-red-500"
        }
      >
        {row.getValue("status")}
      </Badge>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
