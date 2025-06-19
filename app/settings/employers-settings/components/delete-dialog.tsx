import { IconAlertTriangle } from "@tabler/icons-react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { GlobalData } from "../schema/schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useDeleteEmployer from "../hooks/useDeleteEmployer";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: GlobalData;
}

export function DeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { deleteEmployers } = useDeleteEmployer();
  const handleDelete = () => {
    onOpenChange(false);
    deleteEmployers(currentRow.id || 0);
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
            <span className="font-bold">{currentRow.nameOfEmplyeer}</span>?
            <br />
            This action will permanently remove{" "}
            <span className="font-bold">{currentRow.nameOfEmplyeer}</span> from
            the system. This cannot be undone.
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
