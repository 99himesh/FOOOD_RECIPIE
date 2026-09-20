const FollowerModel = require("../models/followeModel");
const NotificationModel = require("../models/notificationModel");
const userModel = require("../models/UserModel");
const { sendNotificationToAll } = require("../socketio/notification");

const followUser=async(req,res)=>{
    const {followingId}=req.body;
    try {
    const follow=await FollowerModel.create({followingId,followerId:req.user.id});
    const following=await userModel.findByPk(followingId)
      sendNotificationToAll({
                type: "Follow",
                title: "Follow",
                message: `${req.user.name} Follow ${following?.name}.`
                
          });
          await NotificationModel.create({
              type: "Follow",
              title: "Follow",
               message: `${req.user.name} Follow ${following?.name}.`,
              senderId:req.user.id,
              isRead:false
          })
    res.status(200).json({success:true,message:"Follow user successfully"});

    } catch (error) {
        res.status(500).json({ success: false, message: "Follow user Unsuccessfully" })
        
    }
}


const unFollowUser=async(req,res)=>{
        const {id}=req.params;
    try {
        const unfollow=await FollowerModel.destroy({
            where:{
                followerId:req.user.id,
                followingId:id
            }
        });
         const following=await userModel.findByPk(id)
      sendNotificationToAll({
                type: "Unfollow ",
                title: "Unfollow",
                message: `${req.user.name} Unfollow ${following?.name}.`
                
          });
          await NotificationModel.create({
              type: "follow",
              title: "Unfollow",
               message: `${req.user.name} Unfollow ${following?.name}.`,
              senderId:req.user.id,
              isRead:false
          })
    res.status(200).json({success:true,message:"User unfollow successfully"});
    } catch (error) {        
        res.status(500).json({ success: false, message: "User Unfollow  Unsuccessfully" })
    }
}



module.exports={
    followUser,
    unFollowUser
}
