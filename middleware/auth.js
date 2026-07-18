const jwt=require("jsonwebtoken");
const UserModel=require("../models/userModel");



const auth=async(req,res,next)=>{
    
    try {
        const token=req.header("Authorization").split(" ")[1] ; 
        console.log(token,"token");
        
        const user=await jwt.verify(token,process.env.JWT_SECRET_KEY)        
         const userData=await UserModel.findByPk(user.userId);
         req.user=userData;         
         next();
         
    } catch (error) {
       return res.status(401).json({success:false}) 
    }
}
const admin=async(req,res,next)=>{
    try {
      if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }

        next();

        
    } catch (error) {
       return res.status(401).json({success:false}) 
        
    }
}

module.exports={
    auth,
    admin
}


















