const express=require("express");
const router=express.Router();
const {  auth } = require("../middleware/auth.js");
const rateReviewController=require("../controllers/rateReviewController.js");

router.post("/add",auth,rateReviewController.addRateReview);
router.put("/updateRateReview/:id",auth,rateReviewController.updateRateReview)
router.delete("/deleteRateReview/:id",auth,rateReviewController.deleteRateReview)

module.exports=router;
