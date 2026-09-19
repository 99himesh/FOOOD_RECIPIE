const express=require("express");
const router=express.Router();
const {  auth } = require("../middleware/auth.js");
const notificationController=require("../controllers/notificationController.js");

router.get("/getNotification",auth,notificationController.getNotification);
router.get("/getCountNotification",auth,notificationController.getCountNotification);
router.delete("/deleteNotification/:id",auth,notificationController.deleteNotificationHandler);
router.delete("/deleteALlNotification",auth,notificationController.deleteAllNotificationHandler);

module.exports=router;
