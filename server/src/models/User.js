import mongoose from "mongoose";
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
    email : {type: String, unique: true},
    password: {type: String, required: true}
});
export const  User = mongoose.model("User", userSchema);
