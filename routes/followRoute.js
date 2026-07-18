const express=require("express");
const router=express.Router();
const {  auth } = require("../middleware/auth.js");
const followController=require("../controllers/followerController.js")

router.post("/follow",auth,followController.followUser)
router.delete("/unfollow/:id",auth,followController.unFollowUser)

module.exports=router;
