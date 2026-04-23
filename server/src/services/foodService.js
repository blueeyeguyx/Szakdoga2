export const randomFood = (array, intolerances, foodGroups) => {
  let element = array[Math.floor(Math.random() * array.length)];
  console.log(element); 
  const {lactoseFoods, glutenFoods, fishFoods, eggFoods} = foodGroups;
  if (!array || array.length === 0) {
    throw new Error("Nem lézetik az ételek tömb vagy nulla hosszú");
  }
  if (!intolerances || intolerances.length === 0) {
    return element;
  }
  let attempts = 0;
  while (attempts < 50) {
    let eheto = true;
    if (intolerances.includes("lactose")) {
      if (lactoseFoods.includes(element)) {
        eheto = false;
      }
    }
    if (intolerances.includes("gluten")) {
      if (glutenFoods.includes(element)) {
        eheto = false;
      }
    }
    if (intolerances.includes("fish")) {
      if (fishFoods.includes(element)) {
        eheto = false;
      }
    }
    if (intolerances.includes("egg")) {
      if (eggFoods.includes(element)) {
        eheto = false;
      }
    }
    if (eheto) {
      return element;
    } else {
      attempts += 1;
      element = array[Math.floor(Math.random() * array.length)];
    }
    console.log(element);
  }
  return array[0];
};
