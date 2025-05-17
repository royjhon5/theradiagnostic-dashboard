import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CalendarHeaderActionsAdd() {
  const router = useRouter();
  return (
    <Button
      className="flex items-center gap-1 bg-primary text-background cursor-pointer"
      onClick={() => router.push("/appointment/client-registration")}
    >
      <Plus />
      Create Appointment
    </Button>
  );
}
