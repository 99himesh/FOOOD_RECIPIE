
const AWS = require("aws-sdk");

async function awsS3Services(file) {    
try {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",
        };
    
        const data = await s3.upload(params).promise();
    
        return data.Location;
} catch (error) {
    console.log(error);
    
}
}

module.exports = {awsS3Services};