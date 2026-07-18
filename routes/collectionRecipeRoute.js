const express=require("express");
const router=express.Router();
const {  auth } = require("../middleware/auth.js");
const collectionRecipeController=require("../controllers/collectionRecipeController.js");

router.post("/add",auth,collectionRecipeController.createRecipeToCollection)
router.get("/getCollectionRecipe",auth,collectionRecipeController.getRecipeToCollection)
router.delete("/deleteCollectionRecipe/:id",auth,collectionRecipeController.deleteRecipeToCollection)

module.exports=router;
