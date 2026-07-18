const express=require("express");
const router=express.Router();
const {  auth } = require("../middleware/auth.js");
const collectionController=require("../controllers/collectionController.js");

router.post("/add",auth,collectionController.createCollection)
router.get("/getCollection",auth,collectionController.getCollectionByUserId)
router.delete("/deleteCollection/:id",auth,collectionController.deleteCollection)
router.put("/updateCollection/:id",auth,collectionController.updateCollection)

module.exports=router;
