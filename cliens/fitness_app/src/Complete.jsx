import { useState } from "react";
import axios from "./API/axios";

export default function PlanComplete (){
    const [planID,setPlanID] = useState("");
    const handleComplete = async () => {
        try {
            await axios.patch("/complete",
                { planID: planID },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            alert("Plan marked as completed.");
            setPlanID("");
        } catch (error) {
            alert("Error while marking plan.");
        }
    }
    return (
    <div>
      <h2>Complete Plan</h2>

      <input
        value={planID}
        onChange={(e) => setPlanID(e.target.value)}
        placeholder="Plan ID"
      />

      <button onClick={handleComplete}>
        Mark Complete
      </button>
      <div>
        <h6>
          See weight history <a href="/progress/weight">here</a>
        </h6>
        <h6>
          See workout history <a href="/progress/workout">here</a>
        </h6>
        <h6>
          See calorie history <a href="/progress/macro">here</a>
        </h6>
        <h6>
          Give us feedback on plans <a href="/plan/feedback">here</a>
        </h6>
      </div>
    </div>
  );
}