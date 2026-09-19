const { Op, where } = require("sequelize");
const { userModel } = require("../models");
const FavourateModel = require("../models/favourateModel");
const RateReviewModel = require("../models/rateReviewModel");
const RecipeModel = require("../models/recipeModel");
const NotificationModel = require("../models/notificationModel");
const {sendNotificationToAll} =require("../socketio/notification");
const sequelize = require("../utils/db");
const FollowerModel = require("../models/followeModel");
const createRecipe = async (req, res) => {
console.log(req,"req.user.id");

    const transaction=await sequelize.transaction();

    try {
        const { title, description, instructions,
            cookingTime, servings, dietType, image } = req.body;

        const recipe = await RecipeModel.create({
            title, description, instructions,
            cookingTime, servings, dietType, image, UserId: req.user.id
        },{transaction});
        sendNotificationToAll({
                type: "recipe",
                title: "New Recipe",
                message: `${req.user.name} uploaded a new recipe.`,
                recipeId: recipe?.id,
          });
          await NotificationModel.create({
              type: "recipe",
              title: "New Recipe",
              message: `${req.user.name} uploaded a new recipe.`,
              senderId:req.user.id,
              isRead:false
          },{transaction})
        await transaction.commit();
        res.status(200).json({ success: true, recipe, message: "Recipe created successfully" })

    } catch (error) {
        console.log(error);
        await transaction.rollback();

        res.status(500).json({ success: false, message: error.message })

    }
}
const getRecipeById = async (req, res) => {
    console.log("ds,jbfdjs");
    
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
                
                        {
                            model: userModel,
                            attributes: ["name"]
                        },
                    
                
            ]
        },
        


        );
      const averageRating =
  recipe?.RateReviews?.length > 0
    ? (
        recipe.RateReviews.reduce((sum, item) => sum + item.rate, 0) /
        recipe.RateReviews.length
      ).toFixed(1)
    : "0.0";
       console.log(averageRating,"RateReviews");
       
       const result={...recipe.toJSON(),rate:averageRating}

        if (!recipe) {
            res.status(404).json({ success: false, message: "Recipe not exist" })
        }
        res.status(200).json({ success: true, message: "Recipe fetch successfull", recipe:result})

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ success: false, message: error?.errors[0]?.message })


    }
}

const getRecipeByUserId = async (req, res) => {
   const {id}=req.params;
   console.log(id);
   
   const {page,limit,search}=req.query;
   const pageNumber = parseInt(req.query.page) || 1;
   const limits = parseInt(req.query.limit) || 10;
   const offset = (pageNumber - 1) * limits;
    
    try {
        const user=await userModel.findByPk(id)
        const followerCount=await FollowerModel.count({where:{followingId:id}});
        const followingCount=await FollowerModel.count({where:{followerId:id}});
        console.log(followerCount,"followerCount");
         const recipeWhere = {};
            if (search) {
                recipeWhere.title = {
                    [Op.like]: `%${search}%`,
                };
        }
        const recipe = await RecipeModel.findAndCountAll({
            where: { UserId: id ,...recipeWhere},
            include: [
                {
                    model: RateReviewModel,
                    attributes: ["rate", "review"]
                },
                
                

            ],
            distinct: true,
            limit:limits,
            offset:offset,
            order:[["createdAt","Desc"]]

        });
console.log(req.user.id,"req.user.id");

      const favourate=await FavourateModel.findAll({where:{userId:req.user.id}})
        const data=await favourate.map((item)=>item.RecipeId)
        console.log(data,"jjhk")
        
        const finalrecipe=recipe?.rows?.map((item)=>{
            return {...item.toJSON(),isFavourate:data.includes(item.id)?true:false}

        })



        const fiteredUser=await user.toJSON();
        const userResult={
            name:fiteredUser.name,
            email:fiteredUser.email,
            mobile:fiteredUser.mobile,
            gender:fiteredUser.gender,
            age:fiteredUser.age,
            profilePic:fiteredUser.profilePic,
        }
        
         


        if (!recipe) {
            res.status(404).json({ success: false, message: "Recipe not found" })
        }
        res.status(200).json({ success: true, message: "Recipe fetch successfully", recipe:{recipe:finalrecipe,user:userResult,recipeCount:recipe.count,followerCount, followingCount} });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ success: false, message: error.errors[0].message })

    }
}

const getAllrecipe = async (req, res) => {
     const {page,limit}=req.query;
   const pageNumber = parseInt(req.query.page) || 1;
   const limits = parseInt(req.query.limit) || 10;
   const offset = (pageNumber - 1) * limits;
    const {search ,filter}=req.query;
            const recipeWhere = {};
            if (search) {
                recipeWhere.title = {
                    [Op.like]: `%${search}%`,
                };
             }
              if (filter) {
                   recipeWhere.dietType = filter;
             }
    try {
        const recipe = await RecipeModel.findAndCountAll({
            where: recipeWhere,
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
                 {
                            model: userModel,
                            attributes: ["name"]
                        }
            ],
            offset:offset,
            limit:limits,
            distinct: true,
            order:[["createdAt","Desc"]]
           
                       
                    
        });
        if (!recipe) {
            res.status(404).json({ success: false, message: "Recipe not found" })
        }

          const favourate=await FavourateModel.findAll({where:{userId:req.user.id}})
        const data=await favourate.map((item)=>item.RecipeId)
        
        
        const finalrecipe=recipe?.rows?.map((item)=>{
            return {...item.toJSON(),isFavourate:data.includes(item.id)?true:false}

        })
      



        res.status(200).json({ success: true, message: "Recipe fetch successfully", recipe:{recipe:finalrecipe,count:recipe.count} });


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

        sendNotificationToAll({
                type: "recipe",
                title: "Delete Recipe",
                message: `${req.user.name} deleted recipe.`,
                recipeId: recipe?.id,
          });
          await NotificationModel.create({
              type: "recipe",
              title: "New Recipe",
              message: `${req.user.name} deleted recipe.`,
              senderId:req.user.id,
              isRead:false
          })

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

        sendNotificationToAll({
                type: "recipe",
                title: "Update Recipe",
                message: `${req.user.name} update recipe.`,
                recipeId: recipe?.id,
          });
          await NotificationModel.create({
              type: "recipe",
              title: "Update Recipe",
              message: `${req.user.name} update recipe.`,
              senderId:req.user.id,
              isRead:false
          })
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