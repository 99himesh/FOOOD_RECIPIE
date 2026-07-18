const { recipeModel } = require("../models");
const FavourateModel = require("../models/favourateModel");

const addToFavourate=async(req,res)=>{
   try {
    const {recipeId}=req.body;
    const userId=req.user.id;
    const favourate=await FavourateModel.create({RecipeId:recipeId,UserId:userId});
    if(!favourate){
    res.status(404).json({success:false,message:"Recipe add to favourate failed"})
    }
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
                attributes: ["id", "title", "image", "cookingTime","ingredients"]

            }
        ]
    })
       if(!favourate.length){
           res.status(404).json({success:false,message:"favourate not found"})
       }
       res.status(200).json({success:true,message:"Favourate recipe fetch successfully",favourate})
    } catch (error) {
        console.log(error);
        
    res.status(500).json({success:false,message:"Recipe fetch failed" })
    }

}


const deleteFavourate=async(req,res)=>{
    const {id}=req.params;
    try {
        const favourite=await FavourateModel.destroy({where:{id:id}});
        if(favourite==0){
         res.status(404).json({ success: false, message: "Favourite not exist" });

        }
       res.status(200).json({success:true,message:"Favourate recipe delete successfully"})

        
    } catch (error) {
       res.status(500).json({success:false,message:"Recipe delete failed" })
        
    }
}




module.exports={
    addToFavourate,
    getFavourateByUserId,
    deleteFavourate
}