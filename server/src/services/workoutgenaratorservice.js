import { Workout } from "../models/Workout.js";

export const generateWorkouts = async (user) => {
  const all = await Workout.find().lean();
  const workoutMap = Object.fromEntries(all.map((w) => [w._id, w]));

  const days = [
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
  ];

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const pool = all; // később szűrheted type alapján
  
  return days.map((day) => {
    const selected = shuffle(pool).slice(0, 3);

    console.log("SELECTED SAMPLE:", selected[0]);
    return {
      day,
      workouts: selected.map((w) => workoutMap[w._id] ?? w),
    };
  });
};
