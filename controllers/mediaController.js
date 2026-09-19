const { awsS3Services } = require("../services/aws3Bucket");

 const sendMedia=async(req,res)=>{            
console.log(req.file);

        try {
            const file = req.file;
            console.log(file,"kjjhgjh");
            

            const url = await awsS3Services(file);
        console.log(url,"vhgfgh");
        
            res.json({
                url,success:true,message:"Image upload successfully"
            });
            
    
           
        } catch (error) {
           console.log(error);
            
        }
    }


    module.exports={
        sendMedia
    }