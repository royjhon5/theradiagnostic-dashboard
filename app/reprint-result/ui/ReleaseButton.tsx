import { Button } from "@/components/ui/button";
import { useMainContext } from "../context/context-provider";

export default function ReleaseButton() {
  const { currentRow, setOpen } = useMainContext();
  if (!currentRow || currentRow.clientId === 0) return null;
  return (
    <div>
      <Button
        size="xl"
        className="cursor-pointer w-full"
        onClick={() => setOpen("edit")}
      >
        Done transaction For - {currentRow.fullName}
      </Button>
    </div>
  );
}
