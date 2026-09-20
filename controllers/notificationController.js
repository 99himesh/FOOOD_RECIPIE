
const { Op } = require("sequelize");
const NotificationModel=require("../models/notificationModel")
const getNotification=async(req,res)=>{
     const {page,limit,search}=req.query;
   const pageNumber = parseInt(req.query.page) || 1;
   const limits = parseInt(req.query.limit) || 10;
   const offset = (pageNumber - 1) * limits;
    
    try {
        const notification=await NotificationModel.findAndCountAll({
            where:{
                
                senderId: {
                [Op.ne]: req.user.id
                },
                
            },
             distinct: true,
            limit:limits,
            offset:offset,
            order: [["createdAt", "DESC"]],
        });
        if(!notification){
           res.status(404).json({success:false,message:"Notification not found"})
        }
        const result={count:notification.count,notification:notification.rows}
        res.status(200).json({success:true,message:"Notification fetch successsfully",result})
        
    } catch (error) {
           res.status(500).json({success:false,message:"Notification fetch failed"})
        
    }
}

const getCountNotification=async(req,res)=>{
    try {
        const notificationCount=await NotificationModel.count({
            where:{
                
                senderId: {
                [Op.ne]: req.user.id
                },
                
            }
        });
       
        res.status(200).json({success:true,message:"Notification count fetch successsfully",notificationCount})
        
    } catch (error) {
           res.status(500).json({success:false,message:"Notification fetch failed"})
        
    }
}

const deleteNotificationHandler=async(req,res)=>{
    const {id}=req.params;

    try {
        const deleteNotification=await NotificationModel.destroy({where:{id:id}});        
        if(deleteNotification==0){
           res.status(500).json({success:false,message:"Notification delete failed"}); 
        }
        res.status(200).json({success:true,message:"Notification delete successsfully"});
    } catch (error) {
           res.status(500).json({success:false,message:"Notification delete failed"}); 
    }
}
const deleteAllNotificationHandler=async(req,res)=>{
    try {
        const deleteNotification=await NotificationModel.destroy({where:{}});
        if(deleteNotification==0){
           res.status(500).json({success:false,message:"Notification delete failed"})
        }
        res.status(200).json({success:true,message:"All Notification delete successsfully"})
    } catch (error) {
           res.status(500).json({success:false,message:"Notification delete failed"})   
    }
}


module.exports={
    getNotification,
    getCountNotification,
    deleteNotificationHandler,
    deleteAllNotificationHandler
}