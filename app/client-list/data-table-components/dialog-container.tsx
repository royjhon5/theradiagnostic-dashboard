import { useMainContext } from "../context/context-provider";
import { DeleteDialog } from "./delete-dialog";

export function DialogContainer() {
  const { open, setOpen, currentRow, setCurrentRow } = useMainContext();
  return (
    <>
      {currentRow && (
        <>
          <DeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  );
}
