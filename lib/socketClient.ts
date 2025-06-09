import socketIO from "socket.io-client";
const baseUrl = window.location.origin;
const socketConnect = socketIO(
  baseUrl.split(":")[0] + ":" + baseUrl.split(":")[1] + ":4000"
);

export const AppSocket = () => {
  return socketConnect;
};
