"use client";

import CustomTabs from "@/components/custom-tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { TabsData } from "../data/data";
import useGetClient from "../hooks/useGetClient";
import { useEffect, useRef, useState } from "react";
import { useMainContext } from "../context/context-provider";
import { globalClientSchema } from "../schema/schema";
import { DataTable } from "../data-table-components/data-table";
import { columns } from "../data-table-components/column-header";
import useGetIncrementedId from "../hooks/useGetIncrementedId";
import { AppSocket } from "@/lib/socketClient";
import { Socket } from "socket.io-client";
export default function ClientResultEntry() {
  const { clientDataByStatus, refetchData } = useGetClient();
  const { incrementedIdGet } = useGetIncrementedId();
  const result = globalClientSchema.parse(clientDataByStatus);
  const { currentRow } = useMainContext();
  const [clientId, setClientId] = useState(0);
  const [source, setSource] = useState("");
  const [clientName, setClientName] = useState("");
  const [sex, setSex] = useState("");
  const [Dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [labNo, setLabNo] = useState(0);
  const socketRef = useRef<Socket | null>(null);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy - EEEE");
  const user = Cookies.get("user");
  const userId = Cookies.get("userid");
  let Username: string | null = null;
  if (user) {
    const parsedUser = JSON.parse(user);
    Username = parsedUser.username;
  }

  useEffect(() => {
    if (currentRow) {
      setClientId(currentRow?.id || 0);
      setClientName(currentRow.firstName + " " + currentRow.lastName || "");
      setSex(currentRow.gender || "");
      setDob(currentRow.dateOfBirth || "");
      setAge(currentRow.age?.toString() || "");
      setLabNo(incrementedIdGet || 0);
    }
    const socket = AppSocket();
    if (!socket) return;

    socketRef.current = socket;
    socketRef.current.on("ReceiveClientResultEntry", refetchData);

    return () => {
      socket.off("ReceiveClientResultEntry", refetchData);
    };
  }, [currentRow, incrementedIdGet, refetchData]);

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="bg-background p-2 border-l rounded-lg border-primary shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
          {/* Avatar */}
          <div className="flex flex-row gap-2 items-center">
            <Avatar className="w-15 h-15">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p style={{ fontSize: 10 }}>Performed by:</p>
              <p className="text-md font-bold">{Username}</p>
              <p className="text-sm">ID: {userId}</p>
            </div>
          </div>
          {/* right side */}
          <div className="flex flex-col justify-end md:text-right">
            <p className="text-md font-bold">{formattedDate}</p>
            <p style={{ fontSize: 10 }}>Date of Addition</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1.7fr_4.5fr] gap-2">
        <div className="flex flex-col gap-2">
          <div className="bg-background p-4 rounded-lg shadow-sm gap-2 flex flex-col">
            <div className="grid w-full items-center">
              <Label htmlFor="email">Date</Label>
              <Input type="date" />
            </div>
            <div className="grid w-full items-center">
              <Label>Client ID</Label>
              <Input
                type="text"
                className="w-full"
                value={clientId}
                onChange={(e) => {
                  setClientId(Number(e.target.value));
                }}
              />
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="email">Lab No.</Label>
              <Input
                type="text"
                value={labNo}
                onChange={(e) => {
                  setLabNo(Number(e.target.value));
                }}
              />
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="email">Source</Label>
              <Input
                type="text"
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                }}
              />
            </div>
          </div>
          <DataTable data={result} columns={columns} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-background p-2 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2">
              <div className="col-span-4">
                <div className="grid w-full items-center">
                  <Label>Client name</Label>
                  <Input
                    type="text"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row w-full items-center gap-2">
                <Label>ID</Label>
                <Input
                  type="text"
                  value={clientId}
                  onChange={(e) => {
                    setClientId(Number(e.target.value));
                  }}
                />
              </div>
              <div className="flex flex-row w-full items-center gap-2">
                <Label>Sex</Label>
                <Input
                  type="text"
                  value={sex}
                  onChange={(e) => {
                    setSex(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-row w-full items-center gap-2">
                <Label>DOB</Label>
                <Input
                  type="text"
                  value={Dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-row w-full items-center gap-2">
                <Label>Age</Label>
                <Input
                  type="text"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bg-background p-2 rounded-lg shadow-sm">
            <CustomTabs
              defaultValue="hematology"
              tabItems={TabsData}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
