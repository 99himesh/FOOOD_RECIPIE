const { awsS3Services } = require("../services/aws3Bucket");

 const sendMedia=async(req,res)=>{            
        try {
            const file = req.file;            
            const url = await awsS3Services(file);        
            res.json({
                url,success:true,message:"Image upload successfully"
            });
        } catch (error) {
           res.status(500).json({success:false,message:"Something went wrong"});
        }
    }


    module.exports={
        sendMedia
    }