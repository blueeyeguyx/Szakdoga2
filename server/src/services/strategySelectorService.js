export const selectStrategy = (user) => {
    const {goal, dailyTime, lifestyle} = user;
    if(goal === "lose"){
        if(dailyTime < 30){
            return "HIIT";
        }

        return "CARDIO_SPLIT";
    }

    if(goal === "bulk"){
        if(dailyTime >= 30){
            return "PPL";
        }

        return "UPPER_LOWER";
    }

    if(goal === "upkeep"){
        return "FULL_BODY";
    }

    return "FULL_BODY";
};