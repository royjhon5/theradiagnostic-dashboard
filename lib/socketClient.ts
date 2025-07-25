// lib/socketClient.ts
import { io, Socket } from "socket.io-client";

export const AppSocket = (): Socket | null => {
  if (typeof window === "undefined") return null;

  const baseUrl = window.location.origin;
  const protocol = baseUrl.split(":")[0];
  const host = baseUrl.split(":")[1];
  const socketUrl = `${protocol}:${host}:4000`;

  return io(socketUrl);
};
