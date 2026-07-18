const CollectionModel = require("../models/collectionModel");

const createCollection=async(req,res)=>{
    const {collectionName}=req.body;
   try {
     const collection=await CollectionModel.create({collectionName,UserId:req.user.id})
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
       res.status(200).json({success:true,message:"Collection  delete successfully"})
    } catch (error) {
         res.status(500).json({message:error.errors[0].message})
    }
}

const updateCollection=async(req,res)=>{
    try {
        const {id}=req.params;
        const {collectionName}=req.body;

        const collection=await CollectionModel.findByPk(id);
        if(!collection){
           res.status(404).json({ success: false, message: "Collection not exist" });
        }
        collection.collectionName=collectionName || collection.collectionName;
        await collection.save();
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