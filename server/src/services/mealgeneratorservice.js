import { randomItem } from "./foodservice.js";

export const generateMeals = (calories, intolerances, foodData) => {
  const { breakfasts, lunches, dinners } = foodData;

  const calculateGramm = (targetCalories, calPer100g) => {
    return Math.round((targetCalories / calPer100g) * 100);
  };

  const breakfastCal = Math.round(calories * 0.3);
  const lunchCal = Math.round(calories * 0.4);
  const dinnerCal = Math.round(calories * 0.3);
  const breakfast = randomItem(breakfasts, intolerances);
  const lunch = randomItem(lunches, intolerances);
  const dinner = randomItem(dinners, intolerances);
  if (!breakfast || !lunch || !dinner) {
    throw new Error("Meal generation failed!");
  }
  return [
    {
      type: "Reggeli",
      _id: breakfast._id,
      name: breakfast.name,
      calories: breakfastCal,
      gramms: calculateGramm(breakfastCal, breakfast.calories),
    },
    {
      type: "Ebéd",
      _id: lunch._id,
      name: lunch.name,
      calories: lunchCal,
      gramms: calculateGramm(lunchCal, lunch.calories),
    },
    {
      type: "Vacsora",
      _id: dinner._id,
      name: dinner.name,
      calories: dinnerCal,
      gramms: calculateGramm(dinnerCal, dinner.calories),
    },
  ];
};
