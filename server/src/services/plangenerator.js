// to do: az edzések felosztása gyakorlatok kivitelezésére,
// melyik edzés lenne a legoptimálisabb a felhasználó számára (idő alapján, cél alapján, nap alapján[melyik nap ér rá])
//  ételek hozáadása

export const GeneratePlan = (User,Macros,calories,intolerances) => {
    const usersIntolerances = intolerances;
    const randomItem = (array,intolerances) =>{
        let element = array[Math.floor(Math.random()*array.length)];
        console.log(element);

        if(!array || array.length === 0){
            throw new Error("Nem lézetik a tömb vagy nulla hosszú");
        }
        if(!intolerances || intolerances.length === 0){
            return element;
        }
        while(true){
            let eheto = true;
            if (intolerances.includes("tej")){
                if(lactoseFoods.includes(element)){
                    eheto = false;
                }
            }
            if (intolerances.includes("glutén")){
                if(glutenFoods.includes(element)){
                    eheto = false;
                }
            }
            if (intolerances.includes("hal")){
                if(fishFoods.includes(element)){
                    eheto = false;
                }
            }
            if (intolerances.includes("tojás")){
                if(eggFoods.includes(element)){
                    eheto = false;
                }
            }
            if(eheto){
                return element;
            }
            else{
                element = array[Math.floor(Math.random()*array.length)];
            }
            console.log(element);
        }
        
    };
    const lactoseFoods = [
    "Zabkása tejjel", 
    "Görög joghurt tál", 
    "Túrós lepény", 
    "Fűszeres túrókrém zöldségekkel"];

    const glutenFoods = [
    "Avokádós teljes kiörlésű pirítós", 
    "Sutőben rántott csirke rizzsel", 
    "Cézár saláta"];

    const fishFoods = [
        "Lazac rizzsel", 
        "Tonhalsalláta", 
        "Garnélás avokádó saláta", 
        "Tojáslepény tonhallal", 
        "Párolt tőkehal salátával", 
        "Sült lazacfilé spárgával"];

    const eggFoods = [
        "Zöldséges omlett", 
        "Tojás rántotta", 
        "Tükör tojás", 
        "Fehérjés palacsinta", 
        "Cézár saláta", 
        "Tojáslepény tonhallal"];

    const breakfasts = ["Zabkása", "Zöldséges omlett", "Smoothie", "Tojás rántotta", "Zabkása tejjel", "Zabkása növényi tejjel",
                        "Tükör tojás", "Zabkása fehérjeporral", "Avokádós teljes kiörlésű pirítós", "Túrós lepény","Görög joghurt tál",
                        "Fehérjés palacsinta"];
    const lunches = ["Csirkemell rizzsel", "Pulyka bulgurral", "Marhahús krumplival", "Lazac rizzsel","Cézár saláta","Tonhalsalláta",
                    "Kinoás csirketál","Marhahúsos saláta","Garnélás avokádó saláta","Grillezett tofu steak", "Grillezett csirkemell édesburgonyával",
                 "Mustáros marhaszelet", "Sutőben rántott csirke rizzsel", "Bárányborda édesburgonyával"];
    const dinners = ["Sült zöldségtál", "Saláta csirkével", "Fűszeres túrókrém zöldségekkel", "Saláta tál","Tojáslepény tonhallal", 
        "Párolt tőkehal salátával","Sült lazacfilé spárgával","Hirtelen sült csirkemáj zöldségekkel"];
    const days = ["Hetfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];
    const foods ={"Zabkása" :100 , "Zöldséges omlett" :223 , "Smoothie":54 , "Tojás rántotta":180 , "Zabkása tejjel":120 , "Zabkása növényi tejjel":100 ,
                "Tükör tojás":190 , "Zabkása fehérjeporral":100 , "Avokádós teljes kiörlésű pirítós":210 , "Túrós lepény":220 ,"Görög joghurt tál":120 ,
                "Fehérjés palacsinta":180 ,"Csirkemell rizzsel":150 , "Pulyka bulgurral":140 , "Marhahús krumplival":185 , "Lazac rizzsel":210 ,"Cézár saláta":200 ,
                "Tonhalsalláta":150 ,"Kinoás csirketál":170 ,"Marhahúsos saláta":170 ,"Garnélás avokádó saláta":190 ,"Grillezett tofu steak":150 ,
                "Grillezett csirkemell édesburgonyával":155 ,"Mustáros marhaszelet":190 , "Sutőben rántott csirke rizzsel":215 , "Bárányborda édesburgonyával":260 ,
                "Sült zöldségtál":110 , "Saláta csirkével":140 ,"Fűszeres túrókrém zöldségekkel":120 , "Saláta tál":85 ,"Tojáslepény tonhallal":170 ,
                "Párolt tőkehal salátával":115 ,"Sült lazacfilé spárgával":210 ,"Hirtelen sült csirkemáj zöldségekkel":170 };

    const calculateGramm = (targetCalories,calPer100g) => {
        return Math.round((targetCalories/calPer100g)*100);
    };

    const generateMeals =(calories) => {
        const breakfastCal = Math.round(calories*0.3);
        const lunchCal = Math.round(calories*0.4);
        const dinnerCal = Math.round(calories*0.3);
        const breakfast = randomItem(breakfasts,usersIntolerances);
        const lunch = randomItem(lunches,usersIntolerances);
        const dinner = randomItem(dinners,usersIntolerances);
        if(breakfast === undefined){
            return;
        }
        if(dinner === undefined){
            return;
        }
        if(lunch === undefined){
            return;
        }

        return [{type : "Reggeli", name : breakfast, calories: breakfastCal, gramms: calculateGramm(breakfastCal,foods[breakfast])},
                {type : "Ebéd", name : lunch, calories: lunchCal, gramms: calculateGramm(lunchCal,foods[lunch])},
                {type : "Vacsora", name : dinner, calories: dinnerCal, gramms: calculateGramm(dinnerCal,foods[dinner])}]
    };

    const meals = days.map(day => ({
        day, meals:generateMeals(calories)
    })
    );

    let workouts; 
    if(User.goal == "lose")
    {
        workouts =  [
        {
            day: "Hétfő", workout: "Teljes test edzés"
        },
        {
            day: "Kedd", workout: "Úszás"
        },
        {
            day: "Szerda", workout: "Futás"
        },
        {
            day: "Csütörtök", workout: "Pihenő nap"
        },
        {
            day: "Péntek", workout: "Teljes test edzés"
        },
        {
            day: "Szombat", workout: "HIIT edzés"
        },
        {
            day: "Vasárnap", workout: "Pihenő nap"
        },
        ]
    }
    else{
        workouts =  [
        {
            day: "Hétfő", workout: "Teljes test edzés"
        },
        {
            day: "Kedd", workout: "Pihenő nap"
        },
        {
            day: "Szerda", workout: "Teljes test edzés"
        },
        {
            day: "Csütörtök", workout: "Pihenő nap"
        },
        {
            day: "Péntek", workout: "Teljes test edzés"
        },
        {
            day: "Szombat", workout: "Pihenő nap"
        },
        {
            day: "Vasárnap", workout: "Pihenő nap"
        },
        ]
    }
   
    //["HIIT edzés", "Teljes test edzés", "Úszás", "Futás"] :
    //["Teljes test edzés", "PPL edzés", "Upper/Lower edzés"];

     return{workouts,meals};
}