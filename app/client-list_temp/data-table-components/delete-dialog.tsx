import { IconAlertTriangle } from "@tabler/icons-react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { globalClientData } from "../schema";
import useDeleteClient from "../client/useDeleteClient";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: globalClientData;
}

export function DeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { deleteClient } = useDeleteClient();
  console.log(currentRow);
  const handleDelete = () => {
    onOpenChange(false);
    deleteClient(currentRow.id || 0);
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Delete Data
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.firstName}</span>?
            <br />
            This action will permanently remove{" "}
            <span className="font-bold">{currentRow.firstName}</span> from the
            system. This cannot be undone.
          </p>
          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
