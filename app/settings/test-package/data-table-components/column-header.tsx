import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { globalLabPackageData } from "../schema";
export const columns: ColumnDef<globalLabPackageData>[] = [
  {
    accessorKey: "packageName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("packageName")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "packages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Test" />
    ),
    cell: ({ row }) => {
      const packages: { itemName: string; itemPrice: number }[] =
        row.getValue("packages") || [];

      return (
        <ul className="list-disc pl-5">
          {packages.map((pkg, index) => (
            <li key={index}>{pkg.itemName}</li>
          ))}
        </ul>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>{row.getValue("totalPrice")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
