import { randomFood } from "./foodService.js";

export const generateMeals = (calories, intolerances, foodData) => {
  const { breakfasts, lunches, dinners, foods, foodGroups } = foodData;
  const calculateGramm = (targetCalories, calPer100g) => {
    return Math.round((targetCalories / calPer100g) * 100);
  };
  const breakfastCal = Math.round(calories * 0.3);
  const lunchCal = Math.round(calories * 0.4);
  const dinnerCal = Math.round(calories * 0.3);
  const breakfast = randomFood(breakfasts, intolerances, foodGroups);
  const lunch = randomFood(lunches, intolerances, foodGroups);
  const dinner = randomFood(dinners, intolerances, foodGroups);
  if (!breakfast || !dinner || !lunch) {
    throw new Error("Meal generation failed");
  }
  return [
    {
      type: "Reggeli",
      name: breakfast,
      calories: breakfastCal,
      gramms: calculateGramm(breakfastCal, foods[breakfast]),
    },
    {
      type: "Ebéd",
      name: lunch,
      calories: lunchCal,
      gramms: calculateGramm(lunchCal, foods[lunch]),
    },
    {
      type: "Vacsora",
      name: dinner,
      calories: dinnerCal,
      gramms: calculateGramm(dinnerCal, foods[dinner]),
    },
  ];
};
