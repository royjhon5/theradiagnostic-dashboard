// column-header.tsx
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { globalGetClientData } from "@/app/client-list/schema";

export function columns(onClose: () => void): ColumnDef<globalGetClientData>[] {
  return [
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Client Name" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-row gap-1">
          <div>{row.original.firstName}</div>
          <div>{row.original.middleName}</div>
          <div>{row.original.lastName}</div>
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
      accessorKey: "dateOfBirth",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="DOB" />
      ),
      cell: ({ row }) => {
        const rawDate = row.getValue("dateOfBirth") as string;
        const formattedDate = dayjs(rawDate).format("MMMM D, YYYY");
        return <div>{formattedDate}</div>;
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Age" />
      ),
      cell: ({ row }) => <div>{row.getValue("age")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "contactNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contact Number" />
      ),
      cell: ({ row }) => <div>{row.getValue("contactNumber")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "emailAddress",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email Address" />
      ),
      cell: ({ row }) => <div>{row.getValue("emailAddress")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "isFag",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Flag" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.isFag === "For Pickup" ? (
            <Badge className="bg-green-500">For Pickup</Badge>
          ) : (
            <Badge className="bg-blue-500">For Email</Badge>
          )}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} onClose={onClose} />,
    },
  ];
}
