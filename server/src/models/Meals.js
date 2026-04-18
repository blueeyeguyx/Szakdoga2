import mongoose from "mongoose";
const mealsSchema = new mongoose.Schema({
  name : String,
  calories : Number,
  carbs : Number,
  fats : Number,
  protein : Number
});
export const  Meals = mongoose.model("Meals", mealsSchema);