import { useState } from "react";
import axios from "./API/axios";

export default function Macrolog() {
    const [calories, setCalories] = useState("");
    const [carbs, setCarbs] = useState("");
    const [protein, setProtein] = useState("");
    const [fat, setFat] = useState("");
    const handleSubmit = async () => {
        try {
            await axios.post("/progress/macro",
                {
                    calories: Number(calories),
                    carbs : Number(carbs),
                    protein : Number(protein),
                    fat : Number (fat)
                }
            );
            alert("Calories and macros saved.");
            setCalories("");
            setCarbs("");
            setProtein("");
            setFat("");

        } catch (error) {
            console.log(error);
        }
    }
    return (
    <div>
      <h2>Macros Log</h2>

      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />

      <input
        type="number"
        placeholder="Protein"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
      />

      <input
        type="number"
        placeholder="Carbs"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value)}
      />

      <input
        type="number"
        placeholder="Fat"
        value={fat}
        onChange={(e) => setFat(e.target.value)}
      />

      <button onClick={handleSubmit}>Save</button>
      <div>
        <h6>
          See weight history <a href="/progress/weight">here</a>
        </h6>
        <h6>
          See workout history <a href="/progress/workout">here</a>
        </h6>
        <h6>
          Mark a plan as completed <a href="/plan/complete">here</a>
        </h6>
        <h6>
          Give us feedback on plans <a href="/plan/feedback">here</a>
        </h6>
      </div>
    </div>
  );

}