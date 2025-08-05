const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: ["http://192.168.1.26:3000"],
  },
});

app.use(cors());

socketIO.on("connection", (socket) => {
  socket.on("submitClient", () => {
    socketIO.emit("getQueue");
  });
  socket.on("callQueue", () => {
    socketIO.emit("getCalledQueue");
  });

  socket.on("SendToClientReceiving", () => {
    socketIO.emit("ReceiveClientReceiving");
  });

  socket.on("SendToClientResultEntry", () => {
    socketIO.emit("ReceiveClientResultEntry");
  });

  socket.on("SendToClientForEvaluation", () => {
    socketIO.emit("ReceiveClientForEvaluation");
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello" });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
