import mongoose from "mongoose";
const workoutSchema = new mongoose.Schema({
  name : String,
  musclegroup : String,
  duration : Number,
  dificulty : String
});
export const  Workout = mongoose.model("Workout", workoutSchema);