import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {User} from "./models/User.js";
import { Plan } from "./models/Plan.js";
import { GeneratePlan } from "./services/plangenerator.js";
//import  userRouter  from "./routes/userRoute.js";
//import profileRouter from "./routes/profileRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/fitness-app").then(()=>console.log("MongoDB is running")).catch(R => console.error("MongoDB Error: ",R));

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend működik 🚀" });
});

app.get("/api/users",async(req,res)=>{
  const Users = await User.find();
  res.json({Users});
})

app.post("/api/calculate", async (req, res) => {
    const age = Number(req.body.age);
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    const gender = req.body.gender;
    const goal = req.body.goal;
    const intolerances = req.body.intolerances;
    const lifestyle = req.body.lifestyle;
    let score;
    const bmr = 10*weight + 6.25*height - 5*age + (gender === "male" ? 5 : -161 );
    switch (lifestyle){
      case "sitting":
        score = 1.2;
        break;

      case "slightlyactive":
        score = 1.375;
        break;

      case "moderatelyactive":
        score = 1.55;
        break;

      case "veryactive":
        score = 1.725;
        break;
      case "extremelyactive":
        score = 1.9;
        break;

      default:
        score = 1.2;
        break;
    }
    let calories = goal === "lose" ? (bmr*score)*0.8 : goal === "bulk" ? (bmr*score)*1.2 : bmr*score;
    const protein1 = goal === "bulk" ? weight * 2 : goal === "lose" ? weight * 1.8 : weight * 1.6;
    const fat1 = weight * 0.8;
    const remainingCalories = calories - (protein1 * 4 + fat1 * 9);
    const carbs1 = remainingCalories / 4;
    calories = Math.floor(calories);
      const user = await User.create({
        age,
        weight,
        height,
        gender,
        goal,
        intolerances,
        lifestyle,
        calories
      });
    const macros = {
      protein: protein1,
      fat: fat1,
      carbs: carbs1
    }
    const planData = GeneratePlan(req.body, macros,calories,intolerances);
    const plan = await Plan.create({
      userID: user._id,
      calories,
      macros,
      meals: planData.meals,
      workouts: planData.workouts
    });
    res.json({macros, plan, calories, user});

});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});