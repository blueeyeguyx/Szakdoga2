// to do: az edzések felosztása gyakorlatok kivitelezésére,
// melyik edzés lenne a legoptimálisabb a felhasználó számára (idő alapján, cél alapján, nap alapján[melyik nap ér rá])
//  ételek hozáadása

//import { dishes } from "../data/fooddata.js";
import { generateMeals } from "./mealgeneratorservice.js";
import { generateWorkouts } from "./workoutgenaratorservice.js";
import { Meals } from "../models/Meals.js";

export const GeneratePlan = async (User, Macros, calories) => {
  const breakfasts = await Meals.find({ category: "breakfast" });
  const lunches = await Meals.find({ category: "lunch" });
  const dinners = await Meals.find({ category: "dinner" });
  const foodData = { breakfasts, lunches, dinners };
  if (!breakfasts.length || !lunches.length || !dinners.length) {
    throw new Error("Meals DB is empty for a category!");
  }
  const days = [
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
  ];
  const meals = days.map((day) => ({
    day,
    meals: generateMeals(calories, User.intolerances, foodData),
  }));
  const workouts = await generateWorkouts(User);
  return { workouts, meals };
};
