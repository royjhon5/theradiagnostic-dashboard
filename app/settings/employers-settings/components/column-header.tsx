'use client';

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { GlobalData } from "../schema/schema";

export const columns: ColumnDef<GlobalData>[] = [
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
    accessorKey: "nameOfEmplyeer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name Of Employer" />
    ),
    cell: ({ row }) => <div>{row.getValue("nameOfEmplyeer")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "contactPerson",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Person" />
    ),
    cell: ({ row }) => <div>{row.getValue("contactPerson")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "industry",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Industry" />
    ),
    cell: ({ row }) => <div>{row.getValue("industry")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
