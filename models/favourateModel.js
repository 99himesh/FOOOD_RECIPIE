const { DataTypes } = require("sequelize");
const sequelize=require("../utils/db.js");


const FavourateModel=sequelize.define(
    "Favourate",{
        id:{
             type:DataTypes.INTEGER,
              primaryKey:true,
              autoIncrement:true,
              allowNull:false 
        }
    }
);

module.exports=FavourateModel;