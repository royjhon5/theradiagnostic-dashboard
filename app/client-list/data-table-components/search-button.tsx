import { Button } from "@/components/ui/button";
import { useMainContext } from "@/app/client-list/context/context-provider";
import { Search } from "lucide-react";

export function SearchButton() {
  const { setOpen } = useMainContext();
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen("add")}>
        <span>Search Previous Clients</span> <Search size={18} />
      </Button>
    </div>
  );
}
