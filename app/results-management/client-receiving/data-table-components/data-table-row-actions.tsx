import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { globalClientData } from "../schema/schema";
import { ProcessClientResult } from "@/app/api/services/client.api";
import { toast } from "sonner";
import { AppSocket } from "@/lib/socketClient";

interface DataTableRowActionsProps {
  row: Row<globalClientData>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const socket = AppSocket();
  const updateStatus = (id: number) => {
    try {
      const params = {
        id: id,
        status: "FOR RESULT ENTRY",
      };
      ProcessClientResult(params, id).then((response) => {
        if (response.isSuccess) {
          socket?.emit("SendToClientResultEntry");
          socket?.emit("SendToClientReceiving");
          toast.success("Status updated successfully");
        } else {
          console.error("Failed to update status:", response.message);
        }
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <div className="flex flex-row gap-2 justify-end">
      <>
        <Button
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            updateStatus(row.original.id);
          }}
        >
          Mark as Done
        </Button>
      </>
    </div>
  );
}
