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
        },
         profilePic:{
            type:DataTypes.STRING,
        },
        age:{
            type:DataTypes.INTEGER,
        },
        mobile:{
            type:DataTypes.INTEGER,
        },
        dob:{
            type:DataTypes.STRING,
        },
        gender:{
            type:DataTypes.STRING,
        },
        country:{
            type:DataTypes.STRING,
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