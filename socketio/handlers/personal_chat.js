const MessageModel=require("../../models/MessageModel.js")
const personalChatHandler=(socket,io)=>{  
    socket.on("join",(roomName)=>{
        socket.join(roomName);        
    })
     socket.on("personal-message",async({messageData,roomName,createdAt})=>{         
         await MessageModel.create(messageData)
         io.to(roomName).emit("personal-recieve-message",{...messageData,createdAt})
     })
       socket.on("user-online", (userId) => {
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });
}
module.exports={
    personalChatHandler
}
























