import { useState } from "react";
import axios from "./API/axios";

export default function Workoutlog() {
    const [planID, setPlanID] = useState("");
    const [duration, setDuration] = useState("");
    const [completed, setCompleted] = useState(true);
    const handleSubmit = async () => {
        try {
            await axios.post("/progress/workout",
                {
                    planID: planID,
                    duration: Number(duration),
                    completed: completed
                }
            );
            alert("Workout saved.");
            setPlanID("");
            setDuration("");
            setCompleted(true);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h2>Workout Log</h2>

            <input
                value={planID}
                onChange={(e) => setPlanID(e.target.value)}
                placeholder="Plan ID"
            />

            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration (min)"
            />

            <button onClick={handleSubmit}>
                Log Workout
            </button>
            <div>
                <h6>
                    See weight history <a href="/progress/weight">here</a>
                </h6>
                <h6>
                    See calorie history <a href="/progress/macro">here</a>
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