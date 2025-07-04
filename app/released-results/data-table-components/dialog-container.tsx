import { useMainContext } from "../context/context-provider";
import { ConfirmationDialog } from "./confirm-dialog";

export function DialogContainer() {
  const { open, setOpen, currentRow, setCurrentRow } = useMainContext();
  return (
    <>
      {currentRow && (
        <>
          <ConfirmationDialog
            key={`user-edit-${currentRow.clientId}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
          />
        </>
      )}
    </>
  );
}
