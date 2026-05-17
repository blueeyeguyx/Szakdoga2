export const dishes = () => {
  const lactoseFoods = [
    "Zabkása tejjel",
    "Görög joghurt tál",
    "Túrós lepény",
    "Fűszeres túrókrém zöldségekkel",
  ];

  const glutenFoods = [
    "Avokádós teljes kiörlésű pirítós",
    "Sutőben rántott csirke rizzsel",
    "Cézár saláta",
  ];

  const fishFoods = [
    "Lazac rizzsel",
    "Tonhalsalláta",
    "Garnélás avokádó saláta",
    "Tojáslepény tonhallal",
    "Párolt tőkehal salátával",
    "Sült lazacfilé spárgával",
  ];

  const eggFoods = [
    "Zöldséges omlett",
    "Tojás rántotta",
    "Tükör tojás",
    "Fehérjés palacsinta",
    "Cézár saláta",
    "Tojáslepény tonhallal",
  ];

  const breakfasts = [
    "Zabkása",
    "Zöldséges omlett",
    "Smoothie",
    "Tojás rántotta",
    "Zabkása tejjel",
    "Zabkása növényi tejjel",
    "Tükör tojás",
    "Zabkása fehérjeporral",
    "Avokádós teljes kiörlésű pirítós",
    "Túrós lepény",
    "Görög joghurt tál",
    "Fehérjés palacsinta",
  ];
  const lunches = [
    "Csirkemell rizzsel",
    "Pulyka bulgurral",
    "Marhahús krumplival",
    "Lazac rizzsel",
    "Cézár saláta",
    "Tonhalsalláta",
    "Kinoás csirketál",
    "Marhahúsos saláta",
    "Garnélás avokádó saláta",
    "Grillezett tofu steak",
    "Grillezett csirkemell édesburgonyával",
    "Mustáros marhaszelet",
    "Sutőben rántott csirke rizzsel",
    "Bárányborda édesburgonyával",
  ];
  const dinners = [
    "Sült zöldségtál",
    "Saláta csirkével",
    "Fűszeres túrókrém zöldségekkel",
    "Saláta tál",
    "Tojáslepény tonhallal",
    "Párolt tőkehal salátával",
    "Sült lazacfilé spárgával",
    "Hirtelen sült csirkemáj zöldségekkel",
  ];

  const foods = {
    Zabkása: {
      calories: 100,
      protein: 3,
      carbs: 17,
      fat: 2,
    },
    "Zöldséges omlett": {
      calories: 223,
      protein: 12,
      carbs: 3,
      fat: 18,
    },
    Smoothie: {
      calories: 54,
      protein: 1,
      carbs: 12,
      fat: 0.5,
    },
    "Tojás rántotta": {
      calories: 180,
      protein: 12,
      carbs: 2,
      fat: 14,
    },
    "Zabkása tejjel": {
      calories: 120,
      protein: 4,
      carbs: 18,
      fat: 3,
    },
    "Zabkása növényi tejjel": {
      calories: 100,
      protein: 3,
      carbs: 17,
      fat: 2.5,
    },
    "Tükör tojás": {
      calories: 190,
      protein: 13,
      carbs: 1,
      fat: 15,
    },
    "Zabkása fehérjeporral": {
      calories: 100,
      protein: 8,
      carbs: 12,
      fat: 2,
    },
    "Avokádós teljes kiörlésű pirítós": {
      calories: 210,
      protein: 6,
      carbs: 22,
      fat: 11,
    },
    "Túrós lepény": {
      calories: 220,
      protein: 10,
      carbs: 25,
      fat: 9,
    },
    "Görög joghurt tál": {
      calories: 120,
      protein: 10,
      carbs: 6,
      fat: 5,
    },
    "Fehérjés palacsinta": {
      calories: 180,
      protein: 12,
      carbs: 15,
      fat: 7,
    },
    "Csirkemell rizzsel": {
      calories: 150,
      protein: 12,
      carbs: 18,
      fat: 3,
    },
    "Pulyka bulgurral": {
      calories: 140,
      protein: 13,
      carbs: 16,
      fat: 2,
    },
    "Marhahús krumplival": {
      calories: 185,
      protein: 14,
      carbs: 20,
      fat: 6,
    },
    "Lazac rizzsel": {
      calories: 210,
      protein: 15,
      carbs: 18,
      fat: 9,
    },
    "Cézár saláta": {
      calories: 200,
      protein: 10,
      carbs: 8,
      fat: 15,
    },
    Tonhalsalláta: {
      calories: 150,
      protein: 16,
      carbs: 5,
      fat: 7,
    },
    "Kinoás csirketál": {
      calories: 170,
      protein: 13,
      carbs: 18,
      fat: 5,
    },
    "Marhahúsos saláta": {
      calories: 170,
      protein: 15,
      carbs: 6,
      fat: 9,
    },
    "Garnélás avokádó saláta": {
      calories: 190,
      protein: 14,
      carbs: 7,
      fat: 11,
    },
    "Grillezett tofu steak": {
      calories: 150,
      protein: 12,
      carbs: 4,
      fat: 9,
    },
    "Grillezett csirkemell édesburgonyával": {
      calories: 155,
      protein: 14,
      carbs: 17,
      fat: 3,
    },
    "Mustáros marhaszelet": {
      calories: 190,
      protein: 16,
      carbs: 2,
      fat: 12,
    },
    "Sutőben rántott csirke rizzsel": {
      calories: 215,
      protein: 14,
      carbs: 22,
      fat: 8,
    },
    "Bárányborda édesburgonyával": {
      calories: 260,
      protein: 15,
      carbs: 15,
      fat: 16,
    },
    "Sült zöldségtál": {
      calories: 110,
      protein: 3,
      carbs: 12,
      fat: 5,
    },
    "Saláta csirkével": {
      calories: 140,
      protein: 13,
      carbs: 6,
      fat: 6,
    },
    "Fűszeres túrókrém zöldségekkel": {
      calories: 120,
      protein: 11,
      carbs: 5,
      fat: 5,
    },
    "Saláta tál": {
      calories: 85,
      protein: 2,
      carbs: 8,
      fat: 4,
    },
    "Tojáslepény tonhallal": {
      calories: 170,
      protein: 15,
      carbs: 3,
      fat: 11,
    },
    "Párolt tőkehal salátával": {
      calories: 115,
      protein: 14,
      carbs: 4,
      fat: 4,
    },
    "Sült lazacfilé spárgával": {
      calories: 210,
      protein: 16,
      carbs: 5,
      fat: 14,
    },
    "Hirtelen sült csirkemáj zöldségekkel": {
      calories: 170,
      protein: 15,
      carbs: 6,
      fat: 10,
    },
  };

  return {
    foodGroups: { lactoseFoods, glutenFoods, fishFoods, eggFoods },
    breakfasts,
    lunches,
    dinners,
    foods,
  };
};
