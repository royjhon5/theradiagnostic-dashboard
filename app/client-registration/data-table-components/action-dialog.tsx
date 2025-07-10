import useClient from "@/app/client-list/hooks/useClient";
import { globalGetClientSchema } from "@/app/client-list/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable } from "./data-table";
import { columns } from "./column-header";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActionDialog({ open, onOpenChange }: Props) {
  const { clients } = useClient();
  const result = globalGetClientSchema.parse(clients);
  const handleClose = () => onOpenChange(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[80vw] sm:max-h-[80vw]">
        <DialogHeader className="text-left">
          <DialogTitle>Search Previous Clients</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <DataTable data={result} columns={columns(handleClose)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
