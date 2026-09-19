const { DataTypes } = require("sequelize");
const sequelize=require("../utils/db.js");

const UserModel =require("./UserModel.js");
const RecipeModel =require("./recipeModel.js");

const NotificationModel = sequelize.define(
    "notification",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        // Who performed the action
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        // Optional (for recipe-related notifications)
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        type: {
            type: DataTypes.ENUM(
                "recipe",
                "follow",
                "like",
                "comment",
                "rating",
                "collection"
            ),
            allowNull: false,
        },

        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }
);

// export default NotificationModel;
module.exports=
    NotificationModel
