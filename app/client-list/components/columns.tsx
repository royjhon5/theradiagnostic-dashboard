import { ColumnDef } from "@tanstack/react-table";

import { GlobalData } from "../data/data";
import { DataTableColumnHeader } from "./table-header";
import { DataTableRowActions } from "./table-row-actions";

export const DataColumns: ColumnDef<GlobalData>[] = [
  {
    accessorKey: "groupline_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group Line" />
    ),
    cell: ({ row }) => (
      <div className="max-w-45">{row.getValue("groupline_name")}</div>
    ),
    meta: { className: "w-50" },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
