import { Socket, io } from "socket.io-client";
import { SOCKET_URL } from "@env";

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("서버 연결");
});
