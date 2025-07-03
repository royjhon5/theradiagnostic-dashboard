import { Button } from "@/components/ui/button";
import { useMainContext } from "../context/context-provider";

export default function ReleaseButton() {
  const { currentRow, setOpen } = useMainContext();
  if (!currentRow || currentRow.clientId === 0) return null;
  console.log(currentRow.fullName);
  return (
    <div>
      <Button
        size="xl"
        className="cursor-pointer w-full"
        onClick={() => setOpen("edit")}
      >
        Click to Release Result For - {currentRow.fullName}
      </Button>
    </div>
  );
}
