require('dotenv').config();
const db=require("./utils/db.js")
const express=require('express');
const cors=require("cors")
const app=express();

//models
const userModel=require("./models/UserModel.js")

//route
const userRoute=require("./routes/userRoute.js")

app.use(express.json());
app.use(cors());


app.use("/user",userRoute)






db.sync().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
})

}).catch((error)=>{
    console.log(`server error ${error}`);
})
