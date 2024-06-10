// socketServer.ts
import { Server, Socket } from "socket.io";

let io: Server;

export const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log("Setting up socket.io");

    io = new Server(res.socket.server);

    io.on("connection", (socket: Socket) => {
      console.log("Client connected", socket.id);

      socket.on("message", (data) => {
        console.log("Message received:", data);
        socket.broadcast.emit("message", data);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export const getSocketServer = () => io;
