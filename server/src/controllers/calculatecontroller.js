import { User } from "../models/User.js";
import { Plan } from "../models/Plan.js";
import { GeneratePlan } from "../services/plangenerator.js";
import { calculate } from "../services/calculateservice.js";

export const calculating = async (req, res) => {
  const userData = req.body;
  const user = await User.findById(req.userID);

  if (!user) {
    return res.status(404).json({
      error: "User not found.",
    });
  }

  const allowedFields = [
    "name",
    "age",
    "weight",
    "height",
    "goal",
    "intolerances",
    "dailyTime",
    "lifestyle",
  ];
  allowedFields.forEach((field) => {
    if (userData[field] !== undefined) {
      user[field] = userData[field];
    }
  });

  await user.save();

  const { calories, macros } = calculate(user);

  await Plan.deleteMany({
    userID: user._id,
  });

  const planData = await GeneratePlan(user, macros, calories);
  const plan = await Plan.create({
    userID: user._id,
    calories,
    macros,
    meals: planData.meals,
    workouts: planData.workouts,
  });
  console.log("FIRST EX:", plan?.workouts?.[0]?.workouts?.[0]);
  user.macroHistory.push({
    date: new Date(),
    calories,
    protein: macros.protein,
    carbs: macros.carbs,
    fat: macros.fat,
  });

  user.workoutHistory.push({
    planId: plan._id,
    completed: false,
    duration: 0,
    date: new Date(),
  });

  await user.save();
  res.json({ macros, plan, calories, user });
};
