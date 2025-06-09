const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: [
      "http://localhost:3000",
      // "http://localhost:3200",
      // "http://localhost:3300",
      //   "http://192.168.1.2:3100",
      //   "http://192.168.1.2:3200",
      //   "http://192.168.1.2:3300",
    ],
  },
});

app.use(cors());

socketIO.on("connection", (socket) => {
  //saving GIF from parters to social worker notification
  socket.on("submitClient", () => {
    socketIO.emit("getQueue");
  });
  socket.on("callQueue", () => {
    socketIO.emit("getCalledQueue");
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
