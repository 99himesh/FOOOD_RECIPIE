const { getIO } = require("./socket");



 const sendNotificationToAll = (notification) => {
    const io = getIO();
    io.emit("new-notification", notification);
   
    
};

 const sendNotificationToUser = (socketId, notification) => {
    const io = getIO();

    io.to(socketId).emit("new-notification", notification);
};

 const sendNotificationToRoom = (room, notification) => {
    const io = getIO();

    io.to(room).emit("new-notification", notification);
};

module.exports={
    sendNotificationToRoom,
    sendNotificationToUser,
    sendNotificationToAll

}