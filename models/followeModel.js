const { DataTypes } = require("sequelize");
const sequelize=require("../utils/db.js");


const FollowerModel=sequelize.define(
    "follower",{
        id:{
             type:DataTypes.INTEGER,
              primaryKey:true,
              autoIncrement:true,
              allowNull:false 
        },
        followerId:{
              type:DataTypes.INTEGER,
              allowNull:false 
        },
        followingId:{
              type:DataTypes.INTEGER,
              allowNull:false 
        },

    }
);

module.exports=FollowerModel;