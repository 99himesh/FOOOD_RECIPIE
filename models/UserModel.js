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
             allowNull:false ,
        },
         email:{
            type:DataTypes.STRING,
             unique: true

        },
         profilePic:{
            type:DataTypes.STRING,
        },
        mobile:{
            type:DataTypes.STRING,
            unique: true

        },
        dob:{
            type:DataTypes.STRING,
        },
        age:{
            type:DataTypes.INTEGER,
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
        },
       isBlock: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
            }
    }
);

module.exports=userModel;