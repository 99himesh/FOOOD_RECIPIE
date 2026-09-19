const CollectionModel = require("../models/collectionModel");
const NotificationModel = require("../models/notificationModel");
const { sendNotificationToAll } = require("../socketio/notification");
const createCollection=async(req,res)=>{
    const {collectionName,image}=req.body;
   try {
     const collection=await CollectionModel.create({collectionName,image,UserId:req.user.id});
     sendNotificationToAll({
                type: "collection ",
                title: "create collection",
                message: `${req.user.name} create collection.`
                
          });
          await NotificationModel.create({
              type: "collection",
              title: "create collection",
               message: `${req.user.name} create collection.`,
              senderId:req.user.id,
              isRead:false
          })
     res.status(201).json({success:true,message:"Collection created successfully"})
   } catch (error) {
     res.status(500).json({message:error.errors[0].message})
   }
}


const getCollectionByUserId=async(req,res)=>{
    try {
        const collection=await CollectionModel.findAll({where:{UserId:req.user.id}})
         if(!collection.length){
          res.status(404).json({success:false,message:"collection not exist"});
         }
         res.status(200).json({success:true,message:"Collection fetch successfully",collection})
    } catch (error) {
         res.status(500).json({message:error.errors[0].message})
        
    }
}

const deleteCollection=async(req,res)=>{
    const {id}=req.params;
    try {
        const collection=await CollectionModel.destroy({where:{id:id}});
         if(collection==0){
         res.status(404).json({ success: false, message: "Collection not exist" });
        }
        sendNotificationToAll({
                type: "collection ",
                title: "Delete collection",
                message: `${req.user.name} delete collection.`
                
          });
          await NotificationModel.create({
              type: "collection",
              title: "Delete collection",
               message: `${req.user.name} delete collection.`,
              senderId:req.user.id,
              isRead:false
          })
       res.status(200).json({success:true,message:"Collection  delete successfully"})
    } catch (error) {
         res.status(500).json({message:error.errors[0].message})
    }
}

const updateCollection=async(req,res)=>{
    try {
        const {id}=req.params;
        const {collectionName,image}=req.body;

        const collection=await CollectionModel.findByPk(id);
        if(!collection){
           res.status(404).json({ success: false, message: "Collection not exist" });
        }
        collection.collectionName=collectionName || collection.collectionName;
        collection.image=image || collection.image;
        await collection.save();
         sendNotificationToAll({
                type: "collection ",
                title: "Update collection",
                message: `${req.user.name} update collection.`
                
          });
          await NotificationModel.create({
              type: "collection",
              title: "Update collection",
               message: `${req.user.name} update collection.`,
              senderId:req.user.id,
              isRead:false
          })
        res.status(200).json({success:true,message:"Collection  Update successfully",collection})
        
    } catch (error) {
         res.status(500).json({message:error.errors[0].message})
    }
}



module.exports={
    createCollection,
    getCollectionByUserId,
    deleteCollection,
    updateCollection
}