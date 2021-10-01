import socket from "socket.io";
import http from "http";


// interface IUserBase {
//     socketId:string,
//     userId:string
// }



export default (server: http.Server): socket.Server => {
  const io = socket(server);

  return io;
};
