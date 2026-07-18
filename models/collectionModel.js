const { DataTypes } = require("sequelize");
const sequelize=require("../utils/db.js");


const CollectionModel=sequelize.define(
    "Collection",{
        id:{
             type:DataTypes.INTEGER,
              primaryKey:true,
              autoIncrement:true,
              allowNull:false 
        },
        collectionName:{
             type:DataTypes.STRING,
              allowNull:false 
        }
    }

);

module.exports=CollectionModel;