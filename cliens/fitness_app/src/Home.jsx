import { useEffect, useState } from "react";
import axios from "./API/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

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
    lifestyle: "sitting",
  });

  const [macros, setMacros] = useState(null);
  const [plan, setPlan] = useState(null);
  const [calories, setCalories] = useState(null);

  const [log, setLog] = useState({
    workouts: [],
    meals: [],
  });

  const [chartData, setChartData] = useState([]);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const todayName = new Intl.DateTimeFormat("hu-HU", {
    weekday: "long",
  }).format(new Date());

  const capitalize = (s) =>
    s.charAt(0).toUpperCase() + s.slice(1);

  const today = capitalize(todayName);

  const todayWorkoutPlan =
    plan?.workouts?.find((w) => w.day === today);

  const todayMealPlan =
    plan?.meals?.find((m) => m.day === today);

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/calculate",
        formdata
      );

      setUser(res.data.user);
      setCalories(res.data.calories);
      setMacros(res.data.macros);
      setPlan(res.data.plan);

      const logs =
        res.data.plan?.dailyLogs?.map((d) => ({
          date: d.date,
          burned: d.totalBurned,
          intake: d.totalIntake,
          net: d.net,
        })) || [];

      setChartData(logs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormdata({
        ...formdata,
        intolerances: [...formdata.intolerances, value],
      });
    } else {
      setFormdata({
        ...formdata,
        intolerances: formdata.intolerances.filter(
          (i) => i !== value
        ),
      });
    }
  };

  const handleWorkoutChange = (
    workoutId,
    field,
    value
  ) => {
    setLog((prev) => {
      const existing = prev.workouts.find(
        (w) => w.workoutId === workoutId
      );

      if (!existing) {
        return {
          ...prev,
          workouts: [
            ...prev.workouts,
            {
              workoutId,
              [field]: Number(value),
            },
          ],
        };
      }

      return {
        ...prev,
        workouts: prev.workouts.map((w) =>
          w.workoutId === workoutId
            ? {
                ...w,
                [field]: Number(value),
              }
            : w
        ),
      };
    });
  };

  const handleMealChange = (
    mealId,
    gramsDone
  ) => {
    setLog((prev) => {
      const existing = prev.meals.find(
        (m) => m.mealId === mealId
      );

      if (!existing) {
        return {
          ...prev,
          meals: [
            ...prev.meals,
            {
              mealId,
              gramsDone: Number(gramsDone),
            },
          ],
        };
      }

      return {
        ...prev,
        meals: prev.meals.map((m) =>
          m.mealId === mealId
            ? {
                ...m,
                gramsDone: Number(gramsDone),
              }
            : m
        ),
      };
    });
  };

  const saveProgress = async () => {
    try {
      const res = await axios.post(
        "/api/progress/log",
        {
          planId: plan._id,
          date: today,
          workouts: log.workouts,
          meals: log.meals,
        }
      );

      const newLog = res.data;

      setChartData((prev) => [
        ...prev,
        {
          date: newLog.date,
          burned: newLog.totalBurned,
          intake: newLog.totalIntake,
          net: newLog.net,
        },
      ]);

      alert("Progress saved!");
    } catch (error) {
      console.error(error);
      alert("Error while saving progress!");
    }
  };

  const sendMessage = async () => {
    try {
      const res = await axios.post("/api/chat", {
        message: chatMessage,
        ...formdata,
      });

      setChatHistory([
        ...chatHistory,
        {
          role: "user",
          text: chatMessage,
        },
        {
          role: "AI",
          text: res.data.reply,
        },
      ]);

      setChatMessage("");
    } catch (error) {
      console.error(error);
    }
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

        <select
          name="gender"
          onChange={handleChange}
        >
          <option value="male">Férfi</option>
          <option value="female">Nő</option>
        </select>

        <select
          name="goal"
          onChange={handleChange}
        >
          <option value="upkeep">
            Szintentartás
          </option>
          <option value="bulk">
            Izomtömegnövelés
          </option>
          <option value="lose">Fogyás</option>
        </select>

        <select
          name="lifestyle"
          onChange={handleChange}
        >
          <option value="sitting">
            Ülő életmód
          </option>

          <option value="slightlyactive">
            Enyhén aktív
          </option>

          <option value="moderatelyactive">
            Mérsékelten aktív
          </option>

          <option value="veryactive">
            Nagyon aktív
          </option>

          <option value="extremelyactive">
            Extra aktív
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
            <input
              type="checkbox"
              value="gluten"
              onChange={handleCheckbox}
            />
            Glutén
          </label>

          <label>
            <input
              type="checkbox"
              value="fish"
              onChange={handleCheckbox}
            />
            Hal
          </label>

          <label>
            <input
              type="checkbox"
              value="egg"
              onChange={handleCheckbox}
            />
            Tojás
          </label>
        </div>

        <button type="submit">
          Terv generálása
        </button>
      </form>

      {calories && (
        <h2>Napi kalória: {calories}</h2>
      )}

      {macros && (
        <div>
          <p>Fehérje: {macros.protein}</p>
          <p>Szénhidrát: {macros.carbs}</p>
          <p>Zsír: {macros.fat}</p>
        </div>
      )}

      {plan && (
        <>
          <hr />

          <h2>Mai nap ({today})</h2>

          <h3>Edzések</h3>

          {todayWorkoutPlan?.workouts?.map((ex) => (
            <div
              key={ex._id}
              style={{
                marginBottom: "15px",
              }}
            >
              <b>{ex.name}</b>

              {ex.type === "cardio" ? (
                <>
                  <p>
                    Terv: {ex.duration} perc
                  </p>

                  <input
                    type="number"
                    placeholder="Mennyit csináltál? (perc)"
                    onChange={(e) =>
                      handleWorkoutChange(
                        ex._id,
                        "durationDone",
                        e.target.value
                      )
                    }
                  />
                </>
              ) : (
                <>
                  <p>
                    Terv: {ex.sets}x{ex.reps}
                  </p>

                  <input
                    type="number"
                    placeholder="Összes reps"
                    onChange={(e) =>
                      handleWorkoutChange(
                        ex._id,
                        "repsDone",
                        e.target.value
                      )
                    }
                  />
                </>
              )}
            </div>
          ))}


          <h3>Étkezések</h3>

          {todayMealPlan?.meals?.map((meal) => (
            <div
              key={meal._id}
              style={{
                marginBottom: "15px",
              }}
            >
              <b>{meal.name}</b>

              <p>
                Terv: {meal.gramms}g
              </p>

              <input
                type="number"
                placeholder="Mennyit ettél? (g)"
                onChange={(e) =>
                  handleMealChange(
                    meal._id,
                    e.target.value
                  )
                }
              />
            </div>
          ))}

          <button onClick={saveProgress}>
            Progress mentése
          </button>

          <hr />


          <h2>Progress grafikon</h2>

          <LineChart
            width={700}
            height={300}
            data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="burned"
            />

            <Line
              type="monotone"
              dataKey="intake"
            />

            <Line
              type="monotone"
              dataKey="net"
            />
          </LineChart>
        </>
      )}


      <div style={{ marginTop: "50px" }}>
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
              <b>
                {msg.role === "user"
                  ? "Te"
                  : "AI"}
                :
              </b>{" "}
              {msg.text}
            </p>
          ))}
        </div>

        <input
          value={chatMessage}
          onChange={(e) =>
            setChatMessage(e.target.value)
          }
          placeholder="Kérdezz valamit..."
        />

        <button onClick={sendMessage}>
          Küldés
        </button>
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