const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Recipe = sequelize.define(
  "Recipe",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    ingredients: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cookingTime: {
      type: DataTypes.INTEGER, // in minutes
      allowNull: false,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dietType: {
      type: DataTypes.ENUM(
        "Vegetarian",
        "Vegan",
        "Non-Vegetarian",
        "Jain",
        "Gluten-Free",
        "Keto"
      ),
      allowNull: false,
      defaultValue: "Vegetarian",
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }
);

module.exports = Recipe;