import { Plan } from "../models/Plan.js";
import { User } from "../models/User.js";

export const saveProgress = async (req, res) => {
  const userId = req.userID;
  const { planId, date, workouts, meals } = req.body;

  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).json({ error: "Plan not found" });

  const normalize = (s) => s?.trim().toLowerCase();

  const dayPlan = plan.workouts.find(
    (w) => normalize(w.day) === normalize(date),
  );

  const mealPlan = plan.meals.find((m) => normalize(m.day) === normalize(date));

  console.log(
    "PLAN MEAL DAYS:",
    plan.meals?.map((m) => m.day),
  );
  let totalBurned = 0;
  let totalIntake = 0;

  // 🏋️ WORKOUT LOGIC
  const workoutResults = dayPlan.workouts.map((w) => {
    const input = workouts?.find((x) => x.workoutId === w._id);

    // 👉 DEFAULT = teljesítés
    if (!input) {
      const burned = estimateCalories(w);

      totalBurned += burned;

      return {
        workoutId: w._id,
        done: true,
        repsDone: w.reps,
        durationDone: w.duration || null,
        caloriesBurned: burned,
      };
    }

    const burned = calculateBurn(w, input);

    totalBurned += burned;

    return {
      workoutId: w._id,
      done: true,
      repsDone: input.repsDone || w.reps,
      durationDone: input.durationDone || w.duration,
      caloriesBurned: burned,
    };
  });

  // 🍽️ MEALS LOGIC
  const mealResults = mealPlan.meals.map((m) => {
    const input = meals?.find((x) => x.mealId === m._id);

    if (!input) {
      totalIntake += m.calories;

      return {
        mealId: m._id,
        gramsDone: m.gramms,
        calories: m.calories,
      };
    }

    const ratio = input.gramsDone / m.gramms;
    const calories = m.calories * ratio;

    totalIntake += calories;

    return {
      mealId: m._id,
      gramsDone: input.gramsDone,
      calories,
    };
  });

  const net = totalIntake - totalBurned;

  const log = {
    date: new Date(),
    workouts: workoutResults,
    meals: mealResults,
    totalBurned,
    totalIntake,
    net,
  };

  plan.dailyLogs.push(log);

  await plan.save();

  res.json(log);
};

// helpers
const estimateCalories = (w) => {
  if (w.type === "cardio") {
    return w.duration * w.caloriesPerMin;
  }
  return w.sets * w.reps * w.caloriesPerMin;
};

const calculateBurn = (w, input) => {
  if (w.type === "cardio") {
    return input.durationDone * w.caloriesPerMin;
  }
  return input.repsDone * w.sets * w.caloriesPerMin;
};
