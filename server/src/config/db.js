import mongoose from "mongoose";

export const connectDB = () => {
    try{
        mongoose.connect("mongodb://localhost:27017/fitness-app").then(()=>console.log("MongoDB is running")).catch(R => console.error("MongoDB Error: ",R));
    } catch(error){
        console.error(error);
    }
}