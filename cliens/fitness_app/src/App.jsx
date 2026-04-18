//bejelentkező oldal, grafikon, ai implementálás, role-ok


import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


function App() {

  useEffect(() => {
    axios.get("http://localhost:5000/api/health")
      .then(res => console.log(res.data));
  }, []);
  const [formdata,setFormdata] = useState ({
    "email": "",
    "name" : "",
    "age" : "",
    "gender" : "male",
    "weight" : "",
    "height" : "",
    "goal" : "upkeep",
    "intolerances" : [],
    "dailyTime" : ""
  });

  const [macros,setMacros] = useState(null);
  const [plan,setPlan] = useState(null);

  const[calories,setCalories] = useState(null);
  const handleChange = E => {setFormdata({...formdata,[E.target.name]:E.target.value});};
  const handleSubmit = async E => {E.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/calculate",formdata);
      console.log(res);
      setCalories(res.data.calories);
      setMacros(res.data.macros);
      setPlan(res.data.plan);

    } catch (error) {
      console.error(error);
    }
  };
  const handleCheckbox = (E) => {
    const {value,checked} = E.target;
    console.log(formdata.intolerances);
    if(checked){
      setFormdata({...formdata,intolerances:[...formdata.intolerances,value]});
    }
    else{
      setFormdata({...formdata,intolerances:formdata.intolerances.filter(i => i !== value)});
    }
  };
  const loadProfile = async() => {
    if(!formdata.email){
      alert("Adj meg egy emailt!");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/profile?email=${formdata.email}`);
      setFormdata(res.data.user);
      setCalories(res.data.user.calories);
    } catch (error) {
      console.error(error);
      alert("Profil nem található.");
    }
  };

  return (<div style={{padding : "20px"}}>
    <form onSubmit={handleSubmit}>
      <input name = "email" placeholder="Email" onChange={handleChange} type="email" value={formdata.email} />
      <input name = "name" placeholder="Név" onChange={handleChange} type="text" value={formdata.name} />
      <input name = "age" placeholder="Kor" onChange={handleChange} type="number" value={formdata.age}/>
      <input name = "weight" placeholder="Súly" onChange={handleChange} type="number" value={formdata.weight}/>
      <input name = "height" placeholder="Magasság" onChange={handleChange} type="number" value={formdata.height}/>
      <input name = "dailyTime" placeholder="Mennyi időd van naponta?" onChange={handleChange} type="number" value={formdata.dailyTime}/>
      <select name="gender" id="" onChange={handleChange}>
        <option value="male">Férfi</option>
        <option value="female">Nő</option>
      </select>
      <select name="goal" id="" onChange={handleChange}>
        <option value="upkeep">Szintentartás</option>
        <option value="bulk">Izomtömegnövelés</option>
        <option value="lose">Fogyás</option>
      </select>
      <select name="lifestyle" id="" onChange={handleChange}>
        <option value="sitting">Ülő életmód(Kevés mozgás, irodai munka)</option>
        <option value="slightlyactive">Enyhén aktív(Heti 1-3 edzés)</option>
        <option value="moderatelyactive">Mérsékelten aktív(Heti 3-5 edzés)</option>
        <option value="veryactive">Nagyon aktív(Heti 6-7 edzés)</option>
        <option value="extremelyactive">Extra aktív(Napi 2 edzés, fizikai munka)</option>
      </select>
      <div>
        <p>Ételintoleranciák:</p>
        <label>
          <input
            type="checkbox"
            value="tej"
            onChange={handleCheckbox}
          />
          Laktóz
        </label>

        <label>
          <input
            type="checkbox"
            value="glutén"
            onChange={handleCheckbox}
          />
          Glutén
        </label>

        <label>
          <input
            type="checkbox"
            value="hal"
            onChange={handleCheckbox}
          />
          Hal
        </label>

        <label>
          <input
            type="checkbox"
            value="tojás"
            onChange={handleCheckbox}
          />
          Tojás
        </label>
      </div>
      <button type="submit">Számol</button>
    </form>
    <button onClick={loadProfile} style={{marginTop:"10px"}}>Profil megjelenítése</button>
    {
      calories && <h2>Napi kalória {calories}</h2>
    }
    
{
      plan && 
      (<div>
        <>
        <h3>Edzés</h3>{plan.workouts.map(w => (<p key={w.day}>{w.day}: {w.workout}</p>))}
        <h3>Étrend</h3>{plan.meals.map(day => (
          <div key={day.day}>
            <h4>
              {day.day}
            </h4>
            {
              day.meals.map(meal =>(
                <p key={meal.type}>{meal.type}: {meal.name}---{meal.gramms}g ({meal.calories}cal)</p>
              ))
            }
          </div>
        ))}
        </>
        </div>) 
    }
    {
    macros && (<div>
        <p>Fehérje: {macros.protein}</p>
        <p>Szénhidrát: {macros.carbs}</p>
        <p>Zsír: {macros.fat}</p>
      </div>)
      }
    
  </div>);
}

export default App;
/*
*/