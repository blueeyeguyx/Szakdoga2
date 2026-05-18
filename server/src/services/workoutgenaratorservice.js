import { Workout } from "../models/Workout.js";
import { selectStrategy } from "./strategySelectorService.js";
import { generateHIIT } from "./workoutStrategies/hiitGeneratorService";
import { GeneratePPL } from "./workoutStrategies/pplGeneratorService";
import { GenerateFullBody } from "./workoutStrategies/fullBodyGeneratorService.js";
export const generateWorkouts = async (user) => {
  const strategy = selectStrategy(user);
  switch(strategy){
    case "HIIT":
      return generateHIIT();
    case "PPL":
      return GeneratePPL();
    case "FULL_BODY":
      return GenerateFullBody();
  }

};


/* const all = await Workout.find().lean();
  const workoutMap = Object.fromEntries(all.map((w) => [w._id, w]));

  const days = [
    {
      day: "Hétfő",
      type: "push",
    },
    {
      day: "Kedd",
      type: "pull",
    },
    {
      day: "Szerda",
      type: "legs",
    },
    {
      day: "Csütörtök",
      type: "rest",
    },
    {
      day: "Péntek",
      type: "push",
    },
    {
      day: "Szombat",
      type: "pull_cardio",
    },
    {
      day: "Vasárnap",
      type: "rest",
    },
  ];

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const groups = {
    push: all.filter(
      (w) =>
        w._id.includes("push_up") ||
        w._id.includes("chest_press") ||
        w._id.includes("dip") ||
        w._id.includes("shoulder_press") ||
        w._id.includes("lateral_raise") ||
        w._id.includes("triceps") ||
        w._id.includes("pec_deck"),
    ),

    pull: all.filter(
      (w) =>
        w._id.includes("pull_up") ||
        w._id.includes("lat_pulldown") ||
        w._id.includes("row") ||
        w._id.includes("rear_delt") ||
        w._id.includes("biceps"),
    ),

    legs: all.filter((w) => w._id.includes("leg_") || w._id.includes("abs_")),
    cardio: all.filter((w) => w.type === "cardio"),

    rest: all.filter((w) => w._id === "rest"),
  };

  
  const used = new Set();

  const pickUnique = (arr, count) => {
    const available = arr.filter((w) => !used.has(w._id));

    const selected = shuffle(available).slice(0, count);

    selected.forEach((w) => used.add(w._id));

    return selected;
  };


  return days.map((d) => {
    if (d.type === "rest") {
      return {
        day: d.day,
        workouts: groups.rest,
      };
    }

    let workouts = [];

    switch (d.type) {
      case "push":
        workouts = pickUnique(groups.push, 4);
        break;

      case "pull":
        workouts = pickUnique(groups.pull, 4);
        break;

      case "legs":
        workouts = pickUnique(groups.legs, 4);
        break;

      case "pull_cardio":
        workouts = [
          ...pickUnique(groups.pull, 3),
          ...pickUnique(groups.cardio, 1),
        ];
        break;
    }

    return {
      day: d.day,
      workouts,
    };
  });*/