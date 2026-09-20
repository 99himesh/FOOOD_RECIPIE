const { recipeModel } = require("../models");
const CollectionRecipeModel = require("../models/collectionRecipeModel");
const CollectionModel =require("../models/collectionModel");
const NotificationModel = require("../models/notificationModel");
const { sendNotificationToAll } = require("../socketio/notification");
const createRecipeToCollection=async(req,res)=>{
    try {
       const {CollectionId,RecipeId}=req.body;  
       const isRecipeExist=await CollectionRecipeModel.findAll({where:{CollectionId,RecipeId}})   ;
         if(isRecipeExist.length){
          res.status(404).json({ success: false, message: "Recipe alredy exist in the collection" });

         }
       const CollectionRecipe=await CollectionRecipeModel.create({CollectionId,RecipeId});
       sendNotificationToAll({
                type: "collection ",
                title: "Add Recipe to collection",
                message: `${req.user.name} add recipe to collection.`
                
          });
          await NotificationModel.create({
              type: "collection",
              title: "Add recipe to collection",
               message: `${req.user.name} add recipe to collection.`,
              senderId:req.user.id,
              isRead:false
          })
       res.status(200).json({success:true,message:"Recipe added to  collection successfully"})
    } catch (error) {        
     res.status(500).json({message:error.errors[0].message})
    }
}
const getRecipeToCollection=async(req,res)=>{
    const {CollectionId}=req.query;
    try {
        const collection=await CollectionModel.findByPk(CollectionId)
       const recipeByCollection=await CollectionRecipeModel.findAll({
        where:{
          CollectionId:CollectionId
       },
       include:[
        {
          model:recipeModel  
        }
       
       ]
    });

   
   
    res.status(200).json({success:true,message:"Recipe in collection fetch successfully",recipeByCollection,collection})
       
        
    } catch (error) {
     res.status(500).json({message:error.errors[0].message})
        
    }
}
const deleteRecipeToCollection=async(req,res)=>{
    const {id}=req.params;
    const {RecipeId}=req.query;    
    try {
        const recipeByCollection=await CollectionRecipeModel.destroy({where:{CollectionId:id,RecipeId:RecipeId}});
         if(recipeByCollection==0){
         res.status(404).json({ success: false, message: "Recipe not exist in the collection" });
        }

        sendNotificationToAll({
                type: "collection ",
                title: "Remove recipe to collection",
                message: `${req.user.name} remove recipe to collection.`
                
          });
          await NotificationModel.create({
              type: "collection",
              title: "Remove recipe to collection",
               message: `${req.user.name} remove recipe to collection.`,
              senderId:req.user.id,
              isRead:false
          })
       res.status(200).json({success:true,message:"Recipe  delete successfully from collection"})
    } catch (error) {
         res.status(500).json({message:error.errors[0].message})
    }
}


module.exports={
    createRecipeToCollection,
    getRecipeToCollection,
    deleteRecipeToCollection
}