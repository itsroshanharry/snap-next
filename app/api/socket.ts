// pages/api/socket.ts
import { ioHandler } from "@/socketServer";

export default function handler(req: any, res: any) {
  ioHandler(req, res);
}
