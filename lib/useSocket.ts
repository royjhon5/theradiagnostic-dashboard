import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    const socket = io({
      path: "/api/socket",
    });
    socketRef.current = socket;
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });
    socket.on("message", (msg) => {
      console.log("Received:", msg);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return socketRef;
};
