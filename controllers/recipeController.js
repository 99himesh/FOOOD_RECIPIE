const { userModel } = require("../models");
const RateReviewModel = require("../models/rateReviewModel");
const RecipeModel = require("../models/recipeModel");

const createRecipe = async (req, res) => {
    console.log(req.user.id);

    try {
        const { title, description, ingredients, instructions,
            cookingTime, servings, dietType, image } = req.body;

        const recipe = await RecipeModel.create({
            title, description, ingredients, instructions,
            cookingTime, servings, dietType, image, UserId: req.user.id
        });
        res.status(200).json({ success: true, recipe, message: "Recipe created successfully" })

    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: error.errors[0].message })

    }
}
const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await RecipeModel.findByPk(id, {
            include: [
                {
                    model: RateReviewModel,
                    attributes: ["rate", "review"],
                    include: [
                        {
                            model: userModel,
                            attributes: ["name", "profilePic"]
                        },
                    ]
                },
            ]
        }

        );
        if (!recipe) {
            res.status(404).json({ success: false, message: "Recipe not exist" })
        }
        res.status(200).json({ success: true, message: "Recipe fetch successfull", recipe })

    } catch (error) {
        res.status(500).json({ success: false, message: error.errors[0].message })


    }
}
9
const getRecipeByUserId = async (req, res) => {
    const { userId } = req.body;
    try {
        const recipe = await RecipeModel.findAll({
            where: { UserId: userId },
            include: [
                {
                    model: RateReviewModel,
                    attributes: ["rate", "review"],
                    include: [
                        {
                            model: userModel,
                            attributes: ["name", "profilePic"]
                        },
                    ]
                },
                
                

            ]
        });
        if (!recipe.length) {
            res.status(404).json({ success: false, message: "Recipe not found" })
        }
        res.status(200).json({ success: true, message: "Recipe fetch successfully", recipe });
    } catch (error) {
        res.status(500).json({ success: false, message: error.errors[0].message })

    }
}

const getAllrecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findAll({
            include: [
                {
                    model: RateReviewModel,
                    attributes: ["rate", "review"],
                    include: [
                        {
                            model: userModel,
                            attributes: ["name", "profilePic"]
                        },
                    ]
                }
            ]
        });
        if (!recipe.length) {
            res.status(404).json({ success: false, message: "Recipe not found" })
        }
        res.status(200).json({ success: true, message: "Recipe fetch successfully", recipe });


    } catch (error) {
        res.status(500).json({ success: false, message: error.errors[0].message })
    }
}


const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await RecipeModel.destroy({ where: { id: id } });

        if (recipe == 0) {
            res.status(404).json({ success: false, message: "Recipe not exist" });
        }

        res.status(200).json({ success: true, message: "Recipe delete successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.errors[0].message })
    }
}


const updateRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const { title, description, ingredients, instructions, cookingTime, servings, dietType, image } = req.body;
        const recipe = await RecipeModel.findByPk(id);
        console.log(recipe, "recipe");

        if (!recipe) {
            res.status(404).json({ success: false, message: "Recipe not found" })
        }
        recipe.title = title || recipe.title;
        recipe.description = description || recipe.description;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.instructions = instructions || recipe.instructions;
        recipe.cookingTime = cookingTime || recipe.cookingTime;
        recipe.servings = servings || recipe.servings;
        recipe.dietType = dietType || recipe.dietType;
        recipe.image = image || recipe.image;
        recipe.save();
        res.status(200).json({ success: true, message: "Recipe updated successfully", recipe })

    } catch (error) {
        res.status(500).json({ success: false, message: error.errors[0].message })

    }
}







module.exports = {
    createRecipe,
    getRecipeById,
    getRecipeByUserId,
    getAllrecipe,
    deleteRecipe,
    updateRecipe
}