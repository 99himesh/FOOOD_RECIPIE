const express=require("express");
const router=express.Router();
const {  auth } = require("../middleware/auth.js");
const recipeController=require("../controllers/recipeController.js")

router.post("/add",auth,recipeController.createRecipe);
router.get("/getRecipe/:id",auth,recipeController.getRecipeById);
router.get("/getRecipeByUserId",auth,recipeController.getRecipeByUserId);
router.get("/getAllrecipe",auth,recipeController.getAllrecipe);
router.delete("/deleteRecipe/:id",auth,recipeController.deleteRecipe);
router.put("/updateRecipe/:id",auth,recipeController.updateRecipe);

module.exports=router;
