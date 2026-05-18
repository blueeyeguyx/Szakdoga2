import mongoose from "mongoose";

const weightHistorySchema = new mongoose.Schema({
    weight : Number,
    date : {type: Date, default : Date.now} 
});

const workoutHistorySchema = new mongoose.Schema({
    planId : {type: mongoose.Schema.Types.ObjectId, ref: "Plan"},
    date : {type: Date, default : Date.now},
    completed : Boolean,
    duration : Number
});

const macroHistorySchema = new mongoose.Schema({
    date : {type: Date, default : Date.now},
    calories : Number,
    carb : Number,
    protein : Number,
    fat : Number
});

const dailyLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },

  workouts: [
    {
      workoutId: String,
      name: String,
      reps: Number,
      duration: Number,
      caloriesBurned: Number,
    },
  ],

  meals: [
    {
      mealId: String,
      name: String,
      grams: Number,
      calories: Number,
    },
  ],

  totalBurned: Number,
  totalIntake: Number,
});

const userSchema = new mongoose.Schema({
    name : String,
    age : Number,
    gender : String,
    weight : Number,
    height : Number,
    goal : String,
    intolerances : [String],
    dailyTime : Number,
    calories : Number,
    lifestyle : String,
    email : {type : String , unique : true},
    password : {type: String, required : true},
    weightHistory : [weightHistorySchema],
    workoutHistory : [workoutHistorySchema],
    macroHistory : [macroHistorySchema],
    dailyLogs: [dailyLogSchema]
});

export const  User = mongoose.model("User", userSchema);
