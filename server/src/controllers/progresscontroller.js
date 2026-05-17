import { Plan } from "../models/Plan.js";
import { User } from "../models/User.js";


export const weightTracker =  async (req,res) =>{
    try {

        const { weight } = req.body;

        if(!weight){
            return res.status(400).json({
                messsage: "Weight is required."
            });
        }
        const user = await User.findById(req.userID);

        if(!user){
            return res.status(404).json({
                messsage: "User not found."
            });
        }

        user.weight = weight;
        user.weightHistory.push({
            weight,
            date : new Date()
        });
        await user.save();
        res.json({
            messsage: "Weight saved successfully."
        });
    } catch (error) {
        res.status(500).json({
            messsage: "Error while updating weight."
        });
    }
};

export const workoutTracker = async (req,res) => {
    try {

        const {planID, completed, duration} = req.body;

        if(!planID){
            return res.status(400).json({
                messsage: "PlanID is required."
            });
        }
        const plan = await Plan.findById(planID);

        const user = await User.findById(req.userID);

        if(!user || !plan){
            return res.status(404).json({
                messsage: "User or plan not found."
            });
        }

        user.workoutHistory.push({
            planId :planID,
            date : new Date(),
            completed : completed ?? true,
            duration : duration || 0
        });

        await user.save();
        res.json({
            messsage: "Workout saved successfully."
        });
    } catch (error) {
        res.status(500).json({
            messsage: "Error while logging workout."
        });
    }
};

export const macroTracker = async (req,res) => {
    try {

        const {calories,carbs,protein,fat} = req.body;

        if(!calories || !carbs || !protein || !fat){
            return res.status(400).json({
                messsage: "All fields are required."
            });
        }

        const user = await User.findById(req.userID);

        if(!user){
            return res.status(404).json({
                messsage: "User not found."
            });
        }

        user.macroHistory.push({
            date : new Date(),
            calories : calories,
            carbs : carbs,
            protein : protein,
            fat : fat
        });

        await user.save();
        res.json({
            messsage: "Calories and macros saved successfully."
        });
    } catch (error) {
        res.status(500).json({
            messsage: "Error while logging calories and macros."
        });
    }

};