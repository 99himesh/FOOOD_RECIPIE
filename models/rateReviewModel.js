const { DataTypes } = require("sequelize");
const sequelize=require("../utils/db.js");


const RateReviewModel=sequelize.define(
    "RateReview",{
        id:{
             type:DataTypes.INTEGER,
              primaryKey:true,
              autoIncrement:true,
              allowNull:false 
        },
        rate:{
             type:DataTypes.INTEGER,
        },
        review:{
             type:DataTypes.STRING,
        }
    }

);

module.exports=RateReviewModel;