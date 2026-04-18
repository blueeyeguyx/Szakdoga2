import mongoose from "mongoose";
const mealItemSchema = new mongoose.Schema({
    type: String, name: String, calories: Number, gramms: Number
});
const daySchema = new mongoose.Schema({
    day: String, meals:[mealItemSchema] 
});
const planSchema = new mongoose.Schema({
    userID : {type : mongoose.Schema.Types.ObjectId, ref: "User"},
    calories : Number,
    workouts : [{day: String, workout: String}],
    meals : [daySchema],
    createdAt : {type : Date, default: Date.now},
    macros : {protein: Number, fat: Number, carbs: Number}
});
export const  Plan = mongoose.model("Plan", planSchema);