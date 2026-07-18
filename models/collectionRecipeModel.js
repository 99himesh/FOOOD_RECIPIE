const { DataTypes } = require("sequelize");
const sequelize=require("../utils/db.js");


const CollectionRecipeModel=sequelize.define(
    "CollectionRecipe",{
        id:{
             type:DataTypes.INTEGER,
              primaryKey:true,
              autoIncrement:true,
              allowNull:false 
        }
    }

);

module.exports=CollectionRecipeModel;