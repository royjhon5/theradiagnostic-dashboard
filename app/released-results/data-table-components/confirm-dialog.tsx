import { IconAlertTriangle } from "@tabler/icons-react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useMainContext } from "../context/context-provider";
import useForAuthorization from "../hooks/useForAuthorization";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfirmationDialog({ open, onOpenChange }: Props) {
  const { currentRow } = useMainContext();
  const { submitData } = useForAuthorization();
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={() => {
        submitData(currentRow?.clientId);
        onOpenChange(false);
      }}
      title={
        <span className="text-warning">
          <IconAlertTriangle
            className="mr-1 inline-block stroke-confirm"
            size={18}
          />{" "}
          Update Employee
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to release result for{" "}
            <span className="font-bold">{currentRow?.fullName}</span>?
            <br />
          </p>
        </div>
      }
      confirmText="Release"
      destructive
    />
  );
}
