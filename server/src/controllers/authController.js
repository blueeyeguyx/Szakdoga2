import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
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
};

export const login = async (req, res) => {
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
};