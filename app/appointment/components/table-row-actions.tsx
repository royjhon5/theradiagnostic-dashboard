"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalData } from "../data/data";
import { useMainContext } from "../context/context-provider";
import {
  CalendarClock,
  EllipsisVertical,
  Eye,
  FilePlus,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps {
  row: Row<GlobalData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setCurrentRow } = useMainContext();
  const router = useRouter();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted cursor-pointer flex-end"
          >
            <EllipsisVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-full">
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original);
            }}
            className="cursor-pointer"
          >
            View
            <DropdownMenuShortcut>
              <Eye size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              const encoded = encodeURIComponent(JSON.stringify(row.original));
              router.push(`/appointment/create-assessment?data=${encoded}`);
            }}
            className="cursor-pointer"
          >
            Create Assessment
            <DropdownMenuShortcut>
              <FilePlus size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original);
            }}
            className="cursor-pointer"
          >
            Reschedule
            <DropdownMenuShortcut>
              <CalendarClock size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original);
            }}
            className="cursor-pointer"
          >
            Cancel
            <DropdownMenuShortcut>
              <XIcon size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
