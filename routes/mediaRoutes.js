const express=require("express");
const router=express.Router();
const {  auth } = require("../middleware/auth.js");
const mediaController=require("../controllers/mediaController.js");
const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage(),
});
router.post("/image",upload.single("file"),mediaController.sendMedia)
module.exports=router;
