const NotificationModel = require("../models/notificationModel");
const RateReviewModel = require("../models/rateReviewModel");
const Recipe = require("../models/recipeModel");
const { sendNotificationToAll } = require("../socketio/notification");

const addRateReview = async (req, res) => {
    try {
        const { rate, review, RecipeId } = req.body;
        const rateReview = await RateReviewModel.create({ rate, review, RecipeId ,UserId:req.user.id});
        if (!rateReview) {
            res.status(404).json({ success: false, message: "Recipe not found " })
        }

           sendNotificationToAll({
                type: "Comment",
                title: "Comment",
                message: `${req.user.name} give review to recipe.`,
                recipeId: RecipeId,
          });
          await NotificationModel.create({
              type: "Comment",
              title: "Comment",
              message: `${req.user.name} give review to recipe.`,
              senderId:req.user.id,
              isRead:false
          })

        res.status(200).json({ success: true, message: "Rate or review to recipe successfully", rateReview });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ success: false, message: "Rate or review to recipe  failed" })
    }
}

const deleteRateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const rateReview = await RateReviewModel.destroy({ where: { id: id } });
        if (rateReview == 0) {
            res.status(404).json({ success: false, message: "Rate or review not exist" });

        }
        sendNotificationToAll({
                type: "Comment",
                title: "Comment",
                message: `${req.user.name} deleted review to recipe.`
                
          });
          await NotificationModel.create({
              type: "Comment",
              title: "Comment",
              message: `${req.user.name} deleted review to recipe.`,
              senderId:req.user.id,
              isRead:false
          })
        res.status(200).json({ success: true, message: "Rate or review delete successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: "Rate or review to recipe delete failed" })

    }
}

const updateRateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { review } = req.body;
        const rateReview = await RateReviewModel.findByPk(id);
        if (!rateReview) {
            res.status(404).json({ success: false, message: "Rate or review not exist" });
        }
        rateReview.review = review || rateReview.review;
        await rateReview.save();
        res.status(200).json({ success: true, message: "Review Update successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Rate or review to recipe update failed" })

    }
}


module.exports = {
    addRateReview,
    deleteRateReview,
    updateRateReview
}