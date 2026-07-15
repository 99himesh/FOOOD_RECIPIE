const { DataTypes } = require("sequelize");
const sequelize=require("../utils/db.js");


const userModel=sequelize.define(
    "User",{
        id:{
             type:DataTypes.INTEGER,
              primaryKey:true,
              autoIncrement:true,
              allowNull:false 
        },
        name:{
             type:DataTypes.STRING,
             allowNull:false 
        },
         email:{
            type:DataTypes.STRING,
            allowNull:false 
        },
         profilePic:{
            type:DataTypes.STRING,
            allowNull:false 
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false 
        },
        mobile:{
            type:DataTypes.INTEGER,
            allowNull:false 
        },
        dob:{
            type:DataTypes.STRING,
            allowNull:false  
        },
        gender:{
            type:DataTypes.STRING,
            allowNull:false   
        },
        country:{
            type:DataTypes.STRING,
            allowNull:false   
        },
        role:{
            type:DataTypes.ENUM("user","admin"),
            allowNull:false ,
            defaultValue:"user"
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false 
        }



    }
);

module.exports=userModel;