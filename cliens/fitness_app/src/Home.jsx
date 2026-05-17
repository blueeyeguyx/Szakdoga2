//bejelentkező oldal, grafikon, ai implementálás, role-ok

import { useEffect } from "react";
import axios from "./API/axios";
import { useState } from "react";

function Home() {
  useEffect(() => {
    axios.get("/api/health").then((res) => console.log(res.data));
  }, []);
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

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleChange = (E) => {
    setFormdata({ ...formdata, [E.target.name]: E.target.value });
  };
  const handleSubmit = async (E) => {
    E.preventDefault();

    try {
      const res = await axios.post("/api/calculate", formdata);
      console.log(res);
      setUser(res.data.user);
      setCalories(res.data.calories);
      setMacros(res.data.macros);
      setPlan(res.data.plan);
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

  const sendMessage = async () => {
    const res = await axios.post("/chat", {
      message: chatMessage,
      ...formdata,
    });
    setChatHistory([
      ...chatHistory,
      { role: "user", text: chatMessage },
      { role: "AI", text: res.data.reply },
    ]);
    setChatMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
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
            Ülő életmód (Kevés mozgás, irodai munka)
          </option>
          <option value="slightlyactive">Enyhén aktív (Heti 1-3 edzés)</option>
          <option value="moderatelyactive">
            Mérsékelten aktív (Heti 3-5 edzés)
          </option>
          <option value="veryactive">Nagyon aktív (Heti 6-7 edzés)</option>
          <option value="extremelyactive">
            Extra aktív (Napi 2 edzés, fizikai munka)
          </option>
        </select>
        <div>
          <p>Ételintoleranciák:</p>
          <label>
            <input type="checkbox" value="lactose" onChange={handleCheckbox} />
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

      {calories && <h2>Napi kalória {calories}</h2>}

      {plan && (
        <div>
          <>
            <h3>Edzés</h3>
            {plan.workouts.map((w) => (
              <div key={w.day}>
                <h4>{w.day}</h4>

                {w.workouts.map((ex) => (
                  <p key={ex._id}>
                    {ex.name} —{" "}
                    {ex.type === "cardio"
                      ? `${ex.duration} min`
                      : `${ex.sets}x${ex.reps}`}{" "}
                    ({ex.caloriesPerMin} cal/min)
                  </p>
                ))}
              </div>
            ))}
            <h3>Étrend</h3>
            {plan.meals.map((day) => (
              <div key={day.day}>
                <h4>{day.day}</h4>
                {day.meals.map((meal) => (
                  <p key={meal._id || meal.name}>
                    {meal?.name || "N/A"} --- {meal?.gramms || 0}g (
                    {meal?.calories || 0} cal)
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
      <div style={{ marginTop: "40px" }}>
        <h3>AI Chat</h3>

        <div
          style={{
            border: "1px solid gray",
            padding: "10px",
            height: "200px",
            overflowY: "scroll",
          }}
        >
          {chatHistory.map((msg, i) => (
            <p key={i}>
              <b>{msg.role === "user" ? "Te" : "AI"}:</b> {msg.text}
            </p>
          ))}
        </div>

        <input
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Kérdezz valamit..."
        />
        <button onClick={sendMessage}>Küldés</button>
      </div>
      {user && (
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
          👤 {user.name}
        </div>
      )}
    </div>
  );
}

export default Home;
