"use client";

import { NowServingInSyncRegular } from "@/app/api/services/client.api";
import useGetNowServing from "@/app/queue-screen/hooks/useGetNowServing";
import useGetQue from "@/app/queue-screen/hooks/useGetQue";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppSocket } from "@/lib/socketClient";
import { Check, Loader2 } from "lucide-react";
import { useCallback, useEffect } from "react";

export default function QueueUI() {
  const { queData, refetchQue } = useGetQue();
  const { nowservingData, refetchServing } = useGetNowServing();
  const socket = AppSocket();
  const handleQueueUpdate = useCallback(() => {
    refetchQue();
    refetchServing();
  }, [refetchQue, refetchServing]);

  useEffect(() => {
    socket.on("getQueue", handleQueueUpdate);
    return () => {
      socket.off("getQueue", handleQueueUpdate);
    };
  }, [refetchQue, handleQueueUpdate, socket]);

  const CallRegular = async () => {
    try {
      await NowServingInSyncRegular();
      refetchQue();
      socket.emit("callQueue");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3">
      <div className="col-span-4">
        <div className="bg-background shadow-sm border rounded-md p-2">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2">
            <ScrollArea className="h-190 border-b md:border-r p-2">
              <h2 className="text-center text-2xl font-bold">REGULAR</h2>
              {queData
                .filter(
                  (item) =>
                    item.status === "ON QUEUE" && item.clientType === "Regular"
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-background rounded-lg shadow-md w-full flex flex-row justify-between p-2 items-center mb-2"
                  >
                    <p>QUEUE NO: {item.priorityNo}</p>
                    <Button>Call</Button>
                  </div>
                ))}
            </ScrollArea>
            <ScrollArea className="h-190 border-b md:border-l p-2">
              <h2 className="text-center text-2xl font-bold">PRIORITY</h2>
              {queData
                .filter(
                  (item) =>
                    (item.status === "ON QUEUE" &&
                      item.clientType === "Senior Citizen") ||
                    item.clientType === "PWD"
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-background rounded-lg shadow-md w-full flex flex-row justify-between p-2 items-center mb-2"
                  >
                    <p>QUEUE NO: {item.priorityNo}</p>
                    <Button>Call</Button>
                  </div>
                ))}
            </ScrollArea>
            <Button size="xl" className="text-2xl" onClick={CallRegular}>
              CALL QUEUE
            </Button>
            <Button size="xl" className="text-2xl">
              CALL QUEUE
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="bg-background shadow-md border rounded-md p-2 w-full">
          <h2 className="text-center text-2xl font-bold">PRIORITY</h2>
          {nowservingData.map((item) => (
            <div
              key={item.id}
              className="bg-background rounded-lg shadow-md w-full flex flex-row justify-between p-2 items-center mb-2"
            >
              <p>QUEUE NO: {item.priorityNo}</p>
              <div>
                {item.status === "NOW SERVING" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Check />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
