import mongoose from "mongoose";

const mealSchemaForLogging = new mongoose.Schema({
    name: String,
    grams: Number,
    calories: Number,
    macros: {
        protein: Number,
        fat: Number,
        carbs: Number
    }    
});



const dailyMealLogSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    planId: {type: mongoose.Schema.Types.ObjectId, ref: "Plan"},
    meals: [mealSchemaForLogging],
    totalCalories: Number,
    totalMacros: {
        protein : Number,
        fat: Number,
        carbs: Number
    }

});