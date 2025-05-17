import { Server as IOServer } from "socket.io";
import type { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    const io = new IOServer(res.socket.server, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("message", (msg) => {
        console.log("Received:", msg);
        socket.broadcast.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
