const { recipeModel } = require("../models");
const FavourateModel = require("../models/favourateModel");
const NotificationModel = require("../models/notificationModel");
const RecipeModel = require("../models/recipeModel");
const { sendNotificationToAll } = require("../socketio/notification");

const addToFavourate=async(req,res)=>{
   try {
    const {recipeId}=req.body;
    const userId=req.user.id;
    const favourate=await FavourateModel.create({RecipeId:recipeId,UserId:userId});
    const recipe=await RecipeModel.findByPk(recipeId);
    recipe.isFavourate=true;
    await recipe.save()
    if(!favourate){
    res.status(404).json({success:false,message:"Recipe add to favourate failed"})
    }

      sendNotificationToAll({
                type: "recipe ",
                title: "Add from favourate",
                message: `${req.user.name} like recipe.`
                
          });
          await NotificationModel.create({
              type: "recipe",
              title: "Add from favourate",
               message: `${req.user.name} like recipe.`,
              senderId:req.user.id,
              isRead:false
          })
    res.status(200).json({success:true,message:"Recipe add to favourate successfully",favourate});
   } catch (error) {
    res.status(500).json({success:false,message:"Recipe add to favourate failed"})
   }
}

const getFavourateByUserId=async(req,res)=>{
    try {
       const favourate=await FavourateModel.findAll({
        where:{
         UserId:req.user.id
        },
        include:[
            {
                model:recipeModel,
                attributes: ["id", "title", "image", "cookingTime","dietType"]

            }
        ]
    })
    const result=favourate.map(item=>{
        return {...item.toJSON(),isFavourate:true}
    })
       if(!favourate.length){
           res.status(404).json({success:false,message:"favourate not found"})
       }
       res.status(200).json({success:true,message:"Favourate recipe fetch successfully",favourate:result})
    } catch (error) {
        console.log(error);
        
    res.status(500).json({success:false,message:"Recipe fetch failed" })
    }

}


const deleteFavourate=async(req,res)=>{
    const {id}=req.params;
    try {
        const favourite=await FavourateModel.destroy({where:{UserId:req.user.id,RecipeId:id}});
        if(favourite==0){
         res.status(404).json({ success: false, message: "Favourite not exist",favourite });

        }
          const recipe=await RecipeModel.findByPk(id);          
          recipe.isFavourate=false;
          await recipe.save()

           sendNotificationToAll({
                type: "recipe ",
                title: "Remove from favourate",
                message: `${req.user.name} dislike recipe.`
                
          });
          await NotificationModel.create({
              type: "recipe",
              title: "Remove from favourate",
               message: `${req.user.name} dislike recipe.`,
              senderId:req.user.id,
              isRead:false
          })
       res.status(200).json({success:true,message:"Favourate recipe delete successfully"})

        
    } catch (error) {
        console.log(error);
        
       res.status(500).json({success:false,message:"Recipe delete failed" })
        
    }
}




module.exports={
    addToFavourate,
    getFavourateByUserId,
    deleteFavourate
}