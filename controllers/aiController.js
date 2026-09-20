
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const createRecipeWithAi = async (req, res) => {
    const { title } = req.body;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                Generate a recipe based on the following food title.
                Food Title:
                ${title}
                Return ONLY a valid JSON object in exactly this format:
                {
                "title": "Food title",
                "description": "Short description of the food",
                "instructions": "Step-by-step cooking instructions",
                "cookingTime": 30,
                "servings": 4,
                "dietType": "Vegetarian"
                }

                Rules:
                - "title" must be the given food title.
                - "description" should briefly describe the food.
                - "instructions" should contain clear cooking instructions.
                - "cookingTime" must be a number representing minutes.
                - "servings" must be a number.
                - "dietType" must be exactly one of: Vegetarian, Non-Vegetarian, Vegan.
                - Return ONLY JSON.
                - Do not provide markdown.
                - Do not provide any explanation.
                `});
        const createFoodData = JSON.parse(response.text);
        res.status(200).json({
            success: true,
            food:createFoodData,
            message: "Category fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ mesage: error })
        console.log(error);
    }
}

module.exports = {
    createRecipeWithAi
}