//bejelentkező oldal, grafikon, ai implementálás, role-ok
import { useEffect } from "react";
import axios from "./api/axios";
import { useState } from "react";

function Home() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/health")
      .then((res) => console.log(res.data));
  }, []);
  const currentUserBeallito = JSON.parse(localStorage.getItem("currentUser"));

  console.log(currentUserBeallito);
  
  const [currentUser, setCurrentUser] = useState(currentUserBeallito);
  const [formdata, setFormdata] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    goal: "upkeep",
    intolerances: [],
    dailyTime: "",
  });

  const [macros, setMacros] = useState(null);
  const [plan, setPlan] = useState(null);
  const [calories, setCalories] = useState(null);
  const [view, setView] = useState("none");

  const loadPlan = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plan");
      setPlan(res.data);
      setView("plan");
    } catch (error) {
      console.error(error);
    }
  };
  const newPlan = async () => {
    setView("form");
    setPlan(null);
  };
  const handleChange = (E) => {
    setFormdata({ ...formdata, [E.target.name]: E.target.value });
  };
  const handleSubmit = async (E) => {
    E.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/calculate",
        formdata,
      );
      console.log(res);
      setCalories(res.data.calories);
      setMacros(res.data.macros);
      setPlan(res.data.plan);
      setCurrentUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCheckbox = (E) => {
    const { value, checked } = E.target;
    console.log(formdata.intolerances);
    if (checked) {
      setFormdata({
        ...formdata,
        intolerances: [...formdata.intolerances, value],
      });
    } else {
      setFormdata({
        ...formdata,
        intolerances: formdata.intolerances.filter((i) => i !== value),
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={loadPlan}>📄 Jelenlegi terv</button>
        <button onClick={newPlan} style={{ marginLeft: "10px" }}>
          🔄 Új terv
        </button>
      </div>
      {view !== "plan" && (
        <form onSubmit={handleSubmit}>
          <input
            name="age"
            placeholder="Kor"
            onChange={handleChange}
            type="number"
            value={formdata.age}
          />
          <input
            name="weight"
            placeholder="Súly"
            onChange={handleChange}
            type="number"
            value={formdata.weight}
          />
          <input
            name="height"
            placeholder="Magasság"
            onChange={handleChange}
            type="number"
            value={formdata.height}
          />
          <input
            name="dailyTime"
            placeholder="Mennyi időd van naponta?"
            onChange={handleChange}
            type="number"
            value={formdata.dailyTime}
          />
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
            <option value="sitting">
              Ülő életmód(Kevés mozgás, irodai munka)
            </option>
            <option value="slightlyactive">Enyhén aktív(Heti 1-3 edzés)</option>
            <option value="moderatelyactive">
              Mérsékelten aktív(Heti 3-5 edzés)
            </option>
            <option value="veryactive">Nagyon aktív(Heti 6-7 edzés)</option>
            <option value="extremelyactive">
              Extra aktív(Napi 2 edzés, fizikai munka)
            </option>
          </select>
          <div>
            <p>Ételintoleranciák:</p>
            <label>
              <input
                type="checkbox"
                value="lactose"
                onChange={handleCheckbox}
              />
              Laktóz
            </label>

            <label>
              <input type="checkbox" value="gluten" onChange={handleCheckbox} />
              Glutén
            </label>

            <label>
              <input type="checkbox" value="fish" onChange={handleCheckbox} />
              Hal
            </label>

            <label>
              <input type="checkbox" value="egg" onChange={handleCheckbox} />
              Tojás
            </label>
          </div>
          <button type="submit">Számol</button>
        </form>
      )}
      {view === "plan" && (
        <div>
          <h3>📄 Mentett terv</h3>

          <h4>Edzés</h4>
          {plan.workouts.map((w) => (
            <p key={w.day}>
              {w.day}: {w.workout}
            </p>
          ))}

          <h4>Étrend</h4>
          {plan.meals.map((day) => (
            <div key={day.day}>
              <b>{day.day}</b>
              {day.meals.map((meal) => (
                <p key={meal.type}>
                  {meal.type}: {meal.name}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
      {calories && <h2>Napi kalória {calories}</h2>}

      {plan && (
        <div>
          <>
            <h3>Edzés</h3>
            {plan.workouts.map((w) => (
              <p key={w.day}>
                {w.day}: {w.workout}
              </p>
            ))}
            <h3>Étrend</h3>
            {plan.meals.map((day) => (
              <div key={day.day}>
                <h4>{day.day}</h4>
                {day.meals.map((meal) => (
                  <p key={meal.type}>
                    {meal.type}: {meal.name}---{meal.gramms}g ({meal.calories}
                    cal)
                  </p>
                ))}
              </div>
            ))}
          </>
        </div>
      )}
      {macros && (
        <div>
          <p>Fehérje: {macros.protein}</p>
          <p>Szénhidrát: {macros.carbs}</p>
          <p>Zsír: {macros.fat}</p>
        </div>
      )}
      {currentUser && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 20,
            padding: "8px 12px",
            background: "#222",
            color: "white",
            borderRadius: "8px",
          }}
        >
          👤 {currentUser.name}
        </div>
      )}
    </div>
  );
}

export default Home;
