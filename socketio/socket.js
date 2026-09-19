const  { Server } = require("socket.io");

let io;

 const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    return io;
};

 const getIO = () => io;

 module.exports={
  getIO  ,
  initSocket
 }