const userModel = require("./UserModel");
const FavourateModel = require("./favourateModel.js");
const recipeModel=require("./recipeModel.js")
const CollectionModel=require("./collectionModel.js");
const CollectionRecipeModel = require("./collectionRecipeModel.js");
const RateReviewModel = require("./rateReviewModel.js");
const FollowerModel=require("./followeModel.js")
userModel.hasMany(recipeModel);
recipeModel.belongsTo(userModel)

userModel.hasMany(FavourateModel);
FavourateModel.belongsTo(userModel);

recipeModel.hasMany(FavourateModel);
FavourateModel.belongsTo(recipeModel);

userModel.hasMany(CollectionModel);
CollectionModel.belongsTo(userModel)

CollectionModel.hasMany(CollectionRecipeModel);
CollectionRecipeModel.belongsTo(CollectionModel)

recipeModel.hasMany(CollectionRecipeModel);
CollectionRecipeModel.belongsTo(recipeModel)


recipeModel.hasMany(RateReviewModel);
RateReviewModel.belongsTo(recipeModel)

userModel.hasMany(RateReviewModel);
RateReviewModel.belongsTo(userModel)

module.exports={
    userModel,
    recipeModel
}
