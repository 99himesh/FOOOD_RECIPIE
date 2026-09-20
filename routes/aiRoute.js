const express=require("express");
const router=express.Router();
const aiController=require("../controllers/aiController");
const { auth } = require("../middleware/auth");


router.post("/recipe-with-ai",auth,aiController.createRecipeWithAi)
module.exports=router;
