require('dotenv').config();
const db=require("./utils/db.js")
const express=require('express');
const cors=require("cors")
const app=express();

//models
// const userModel=require("./models/UserModel.js")
// const recipeModel=require("./models/recipeModel.js")
// const FavourateModel=require("./models/favourateModel.js")
require("./models")
//route
const userRoute=require("./routes/userRoute.js")
const recipeRoute=require("./routes/recipeRoute.js")
const favourateRoute=require("./routes/favourateRoute.js");
const collectionRoute=require("./routes/collectionRoute.js");
const collectionRecipeRoute=require("./routes/collectionRecipeRoute.js")
const rateReviewRoute=require("./routes/rateReviewRoute.js");
const followRoute=require("./routes/followRoute.js");
const mediaRoute=require("./routes/mediaRoutes.js"); 
const notificationRoute=require("./routes/notificationRoute.js");
const aiRoute=require("./routes/aiRoute.js")
const { initSocket } = require('./socketio/socket.js');

const  {createServer} =require("http")


const server=new createServer(app);


app.use(express.json());
app.use(cors(
    {
    origin: "http://localhost:5173",
    credentials: true,
}
));




const io = initSocket(server);

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);
});


app.use("/user",userRoute)
app.use("/recipe",recipeRoute)
app.use("/favourate",favourateRoute)
app.use("/collection",collectionRoute)
app.use("/collectionRecipe",collectionRecipeRoute)
app.use("/rateReview",rateReviewRoute)
app.use("/followers",followRoute)
app.use("/media",mediaRoute)
app.use("/notifications",notificationRoute)
app.use("/ai",aiRoute)


db.sync().then(()=>{
    server.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
})

}).catch((error)=>{
    console.log(`server error ${error}`);
})
