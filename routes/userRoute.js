const express=require("express");
const router=express.Router();
const userController=require("../controllers/userController.js");
const {  auth, admin } = require("../middleware/auth.js");


router.post("/signUp",userController.signUp)
router.post("/login",userController.logIn)
router.put("/updateUser/:id",auth,userController.updateUser)
router.get("/getuser/:id",auth ,userController.getUserById)
router.get("/getUsers",auth, userController.getUsers)

module.exports=router;
