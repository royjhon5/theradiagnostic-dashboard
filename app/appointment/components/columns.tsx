import { ColumnDef } from "@tanstack/react-table";

import { GlobalData } from "../data/data";
import { DataTableColumnHeader } from "./table-header";
import { DataTableRowActions } from "./table-row-actions";

export const DataColumns: ColumnDef<GlobalData>[] = [
  {
    accessorKey: "priority_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority No." />
    ),
    cell: ({ row }) => <div className="">{row.getValue("priority_no")}</div>,
    meta: { className: "" },
    enableHiding: false,
  },
  {
    accessorKey: "client_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("client_name")}</div>,
    meta: { className: "" },
    enableHiding: false,
  },
  {
    accessorKey: "sex",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sex" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("sex")}</div>,
    meta: { className: "" },
    enableHiding: false,
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("age")}</div>,
    meta: { className: "" },
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("address")}</div>,
    meta: { className: "" },
    enableHiding: false,
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: DataTableRowActions,
  },
];
