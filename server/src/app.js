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
import { connectDB } from "./config/db.js";
import authRouter from "./routes/AuthRoutes.js";
import chatRouter from "./routes/ChatRoute.js";
import calculateRouter from "./routes/CalculateRoute.js"
//import  userRouter  from "./routes/userRoute.js";
//import profileRouter from "./routes/profileRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

connectDB();

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


app.use("/api", authRouter);
app.use("/api", authMiddleware, chatRouter);
app.use("/api", authMiddleware, calculateRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});