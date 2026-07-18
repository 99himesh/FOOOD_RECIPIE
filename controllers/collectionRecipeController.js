const { recipeModel } = require("../models");
const CollectionRecipeModel = require("../models/collectionRecipeModel");

const createRecipeToCollection=async(req,res)=>{
    try {
       const {CollectionId,RecipeId}=req.body;
       const CollectionRecipe=await CollectionRecipeModel.create({CollectionId,RecipeId});
       res.status(200).json({success:true,message:"Recipe added to  collection successfully"})
    } catch (error) {
     res.status(500).json({message:error.errors[0].message})
    }
}
const getRecipeToCollection=async(req,res)=>{
    const {CollectionId}=req.query;
    try {
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

    if(!recipeByCollection.length){
          res.status(404).json({success:false,message:"Recipe not exist"});
    }
    res.status(200).json({success:true,message:"Recipe in collection fetch successfully",recipeByCollection})
       
        
    } catch (error) {
     res.status(500).json({message:error.errors[0].message})
        
    }
}
const deleteRecipeToCollection=async(req,res)=>{
    const {id}=req.params;
    try {
        const recipeByCollection=await CollectionRecipeModel.destroy({where:{id:id}});
         if(recipeByCollection==0){
         res.status(404).json({ success: false, message: "Recipe not exist in the collection" });
        }
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