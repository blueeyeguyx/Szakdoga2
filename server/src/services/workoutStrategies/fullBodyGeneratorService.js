import { Workout } from "../../models/Workout.js";

const shuffle = (arr) =>
  [...arr].sort(() => Math.random() - 0.5);

const pickOne = (arr, used) => {
  const available = arr.filter(
    (w) => !used.has(w._id)
  );

  if (available.length === 0) {
    return null;
  }

  const selected = shuffle(available)[0];

  used.add(selected._id);

  return selected;
};

export const GenerateFullBody = async () => {
  const workouts = await Workout.find().lean();

  const used = new Set();

  const chest = workouts.filter((w) =>
    w.muscleGroup.includes("chest")
  );

  const back = workouts.filter((w) =>
    w.muscleGroup.includes("back")
  );

  const legs = workouts.filter((w) =>
    w.muscleGroup.includes("legs")
  );

  const shoulders = workouts.filter((w) =>
    w.muscleGroup.includes("shoulders")
  );

  const abs = workouts.filter((w) =>
    w.muscleGroup.includes("abs")
  );

  const cardio = workouts.filter(
    (w) => w.type === "cardio"
  );

  const buildWorkout = () => {
    return [
      pickOne(chest, used),
      pickOne(back, used),
      pickOne(legs, used),
      pickOne(shoulders, used),
      pickOne(abs, used),
      pickOne(cardio, used),
    ].filter(Boolean);
  };

  return [
    {
      day: "Hétfő",
      type: "fullbody",
      workouts: buildWorkout(),
    },
    {
      day: "Kedd",
      type: "rest",
      workouts: await Workout.find({_id: "rest"}),
    },
    {
      day: "Szerda",
      type: "fullbody",
      workouts: buildWorkout(),
    },
    {
      day: "Csütörtök",
      type: "rest",
      workouts: await Workout.find({_id: "rest"}),
    },
    {
      day: "Péntek",
      type: "fullbody",
      workouts: buildWorkout(),
    },
  ];
};