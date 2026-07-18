const FollowerModel = require("../models/followeModel");

const followUser=async(req,res)=>{
    const {followingId}=req.body;
    try {
    const follow=await FollowerModel.create({followingId,followerId:req.user.id});
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
                followerId:id
            }
        });
    res.status(200).json({success:true,message:"User unfollow successfully"});
    } catch (error) {
        res.status(500).json({ success: false, message: "User Unfollow  Unsuccessfully" })
    }
}



module.exports={
    followUser,
    unFollowUser
}
