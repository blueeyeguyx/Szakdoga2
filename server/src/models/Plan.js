import mongoose from "mongoose";
import { workoutSchema } from "./Workout.js";

const mealItemSchema = new mongoose.Schema({
  day: String,
  meals: [
    {
      type: Object,
      ref: "Meals",
    },
  ],
});

const workoutItemSchema = new mongoose.Schema(
  {
    day: String,
    workouts: [workoutSchema],
  },
  { _id: false },
);

const planSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  calories: Number,
  workouts: [workoutItemSchema],
  meals: [mealItemSchema],
  createdAt: { type: Date, default: Date.now },
  macros: { protein: Number, fat: Number, carbs: Number },
  completed: { type: Boolean, default: false },
  feedback: { type: Number, min: 1, max: 5 },
});
export const Plan = mongoose.model("Plan", planSchema);
