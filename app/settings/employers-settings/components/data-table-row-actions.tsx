'use client'

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Archive, Edit, Eye, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { GlobalData } from "../schema/schema";
import { useMainContext } from "../context/context-provider";

interface DataTableRowActionsProps {
  row: Row<GlobalData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useMainContext();
  const router = useRouter();
  return (
    <div className="flex flex-row gap-2 justify-end">
      <>
        <Button
          size="sm"
          className="cursor-pointer bg-primary"
          onClick={() => {
            const encoded = encodeURIComponent(JSON.stringify(row.original));
            router.push(
              `/settings/employers-settings/add-employees?data=${encoded}`
            );
          }}
        >
          <Plus /> Add Employee
        </Button>
        <Button
          size="sm"
          className="cursor-pointer bg-green-500"
          onClick={() => {
            const encoded = encodeURIComponent(JSON.stringify(row.original));
            router.push(
              `/settings/employers-settings/edit-employer?data=${encoded}`
            );
          }}
        >
          <Edit /> Edit
        </Button>
        <Button
          size="sm"
          className="cursor-pointer bg-red-500"
          onClick={() => {
            setCurrentRow(row.original);
            setOpen("delete");
          }}
        >
          <Archive /> Delete
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="cursor-pointer"
          onClick={() => {
            const encoded = encodeURIComponent(JSON.stringify(row.original));
            router.push(
              `/settings/employers-settings/view-employees?data=${encoded}`
            );
          }}
        >
          <Eye /> View
        </Button>
      </>
    </div>
  );
}
