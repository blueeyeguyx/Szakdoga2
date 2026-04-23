// to do: az edzések felosztása gyakorlatok kivitelezésére,
// melyik edzés lenne a legoptimálisabb a felhasználó számára (idő alapján, cél alapján, nap alapján[melyik nap ér rá])
//  ételek hozáadása
import { generateMeals } from "./mealGeneratorService.js";
import { generateWorkouts } from "./workoutGeneratorService.js";
import { dishes } from "../data/foodData.js";

export const GeneratePlan = (userData, macros, calories) => {
  const usersIntolerances = userData.intolerances;
  const days = [
    "Hetfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
  ];

  const foodData = dishes();
  
  const meals = days.map((day) => ({
    day,
    meals: generateMeals(calories, usersIntolerances, foodData),
  }));

  const workouts = generateWorkouts(userData.goal);
  //["HIIT edzés", "Teljes test edzés", "Úszás", "Futás"] :
  //["Teljes test edzés", "PPL edzés", "Upper/Lower edzés"];

  return { workouts, meals };
};
