export const generateWorkouts = (goal) => {
  let workouts;
  if (goal == "lose") {
    workouts = [
      {
        day: "Hétfő",
        workout: "Teljes test edzés",
      },
      {
        day: "Kedd",
        workout: "Úszás",
      },
      {
        day: "Szerda",
        workout: "Futás",
      },
      {
        day: "Csütörtök",
        workout: "Pihenő nap",
      },
      {
        day: "Péntek",
        workout: "Teljes test edzés",
      },
      {
        day: "Szombat",
        workout: "HIIT edzés",
      },
      {
        day: "Vasárnap",
        workout: "Pihenő nap",
      },
    ];
  } else {
    workouts = [
      {
        day: "Hétfő",
        workout: "Teljes test edzés",
      },
      {
        day: "Kedd",
        workout: "Pihenő nap",
      },
      {
        day: "Szerda",
        workout: "Teljes test edzés",
      },
      {
        day: "Csütörtök",
        workout: "Pihenő nap",
      },
      {
        day: "Péntek",
        workout: "Teljes test edzés",
      },
      {
        day: "Szombat",
        workout: "Pihenő nap",
      },
      {
        day: "Vasárnap",
        workout: "Pihenő nap",
      },
    ];
  }
  return workouts;
};
