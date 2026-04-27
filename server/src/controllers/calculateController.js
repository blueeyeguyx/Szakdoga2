export const calculator = async (req, res) => {
    const userData = req.body;

    const user = await User.findById(req.userId);
    if(!user){
      return res.status(404).json({error: "User not found."});  
    }
    const allowedFields = [
      "name",
      "age",
      "weight",
      "height",
      "goal",
      "intolerances",
      "dailyTime",
      "lifestyle"
    ];
    allowedFields.forEach(field => {
      if(userData[field] !== undefined){
        user[field] = userData[field];
      }
    });
    await user.save();
    const {calories, macros} = calculate(user);
    await Plan.deleteMany({userID: user._id});
    const planData = GeneratePlan(user, macros,calories);
    const plan = await Plan.create({
      userID: user._id,
      calories,
      macros,
      meals: planData.meals,
      workouts: planData.workouts
    });
    res.json({macros, plan, calories, user});

};