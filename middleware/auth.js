const jwt=require("jsonwebtoken");
const UserModel=require("../models/userModel");



const auth=async(req,res,next)=>{
    console.log("hello");
    
    try {
        const token=req.header("Authorization").split(" ")[1] ; 
        console.log(token,"token");
        
        const user=await jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(user,"jhvhgg");
                
         const userData=await UserModel.findByPk(user?.userId);
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


















