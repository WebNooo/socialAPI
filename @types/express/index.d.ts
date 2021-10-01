import { IUser } from "../../models/User";
import socket  from "socket.io";

declare global{
  namespace Express {
      interface Request {
          user: IUser,
          io: socket.Server,
          headers:{
            token: string
          }
      }
  }
}