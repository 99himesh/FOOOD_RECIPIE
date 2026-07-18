const express=require("express");
const router=express.Router();
const {  auth } = require("../middleware/auth.js");
const favourateController=require("../controllers/favourateController.js")

router.post("/add",auth,favourateController.addToFavourate)
router.get("/getFavourate",auth,favourateController.getFavourateByUserId)
router.delete("/deleteFavourate/:id",auth,favourateController.deleteFavourate)

module.exports=router;
