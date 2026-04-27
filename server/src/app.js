import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {User} from "./models/User.js";
import { Plan } from "./models/Plan.js";
import { GeneratePlan } from "./services/planGeneratorService.js";
import {calculate} from "./services/nutritionService.js";
import { authMiddleware } from "./routes/Authentication.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import  userRouter  from "./routes/userRoute.js";
//import profileRouter from "./routes/profileRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.connect("mongodb://localhost:27017/fitness-app").then(()=>console.log("MongoDB is running")).catch(R => console.error("MongoDB Error: ",R));

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend működik 🚀" });
});

app.get("/api/users",async(req,res)=>{
  const Users = await User.find();
  res.json({Users});
});

app.get("/api/plan", authMiddleware, async (req, res) => {
  const plan = await Plan.findOne({userID: req.userId});
  if(!plan){
    return res.status(404).json({error: "No plan was found for this user"});
  }
  res.json(plan);
})


app.post("/api/calculate", authMiddleware, async (req, res) => {
    const userData = req.body;

    const user = await User.findById(req.userId);
    if(!user){
      return res.status(404).json({error: "User not found."});  
    }
    const allowedFields = [
      "name",
      "age",
      "weight",
      "height",
      "goal",
      "intolerances",
      "dailyTime",
      "lifestyle"
    ];
    allowedFields.forEach(field => {
      if(userData[field] !== undefined){
        user[field] = userData[field];
      }
    });
    await user.save();
    const {calories, macros} = calculate(user);
    await Plan.deleteMany({userID: user._id});
    const planData = GeneratePlan(user, macros,calories);
    const plan = await Plan.create({
      userID: user._id,
      calories,
      macros,
      meals: planData.meals,
      workouts: planData.workouts
    });
    res.json({macros, plan, calories, user});

});

app.post("/api/register", async (req, res) => {
    const {email, password, ...rest} = req.body;
    try{
      const existingUser = await User.findOne({email});
      if (existingUser){
        return res.status(400).json({error: "An user with this e-mail address already exists. Try logging in."});
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
        ...rest
      });
      res.json({message:"User created"});
    }catch (error){
      return res.status(500).json({error: "An error occured while registering."});
    }
});
app.post("/api/login", async (req, res) => {
  const {email, password, ...rest} = req.body;
  try{
    const existingUser = await User.findOne({email});
    if (!existingUser){
      return res.status(400).json({error: "Incorrect email or password"});
    }
    
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch){
      return res.status(400).json({error: "Incorrect email or password"});
    }
    
    const token = jwt.sign(
      {userId: existingUser._id},
      process.env.JWT_SECRET,
      {expiresIn: "7d"}
    );      
    res.json({token, existingUser});
  }catch(error){
    res.status(500).json({error: "An error occured while logging in."});
  }
});
app.post("/api/profile", authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);
    res.json({user});
})

app.post("/api/chat", async (req, res) => {
  const {message} = req.body;
  try{
    const response = await fetch("https://api.openai.com/v1/chat/completions", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: `You are a helpful fitness and diet assistant. The user: 
            -weight: ${req.body.weight}
            -goal: ${req.body.goal}
            -intolerances: ${req.body.intolerances} 
            Give personalized advice. ` },
          { role: "user", content: message }
        ]
      })
    });
    
    const data = await response.json();
    res.json({
      reply: data.choices[0].message.content
    });
  }catch(err){
    console.error(err);
    res.status(500).json({error: "AI error"});
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});