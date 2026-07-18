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
const followRoute=require("./routes/followRoute.js")
app.use(express.json());
app.use(cors());





app.use("/user",userRoute)
app.use("/recipe",recipeRoute)
app.use("/favourate",favourateRoute)
app.use("/collection",collectionRoute)
app.use("/collectionRecipe",collectionRecipeRoute)
app.use("/rateReview",rateReviewRoute)
app.use("/followers",followRoute)

db.sync().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
})

}).catch((error)=>{
    console.log(`server error ${error}`);
})
