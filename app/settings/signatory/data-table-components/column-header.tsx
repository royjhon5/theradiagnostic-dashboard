import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { globalSignatoryData } from "../schema";

export const columns: ColumnDef<globalSignatoryData>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "signatoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Signatory Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("signatoryName")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "signatoryPosition",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Signatory Position" />
    ),
    cell: ({ row }) => <div>{row.getValue("signatoryPosition")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "licenseNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License Number" />
    ),
    cell: ({ row }) => <div>{row.getValue("licenseNumber")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
