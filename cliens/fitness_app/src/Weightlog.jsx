import { useState } from "react";
import axios from "./API/axios";

export default function Weightlog() {
    const [weight, setWeight] = useState("");
    const handleSubmit = async () => {
        try {
            await axios.post("/progress/weight",
                { weight: Number(weight) },
            );
            alert("Weight saved.");
            setWeight("");

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h2>Log Weight</h2>

            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight (kg)"
            />

            <button onClick={handleSubmit}>Save</button>
            <div>
                <h6>
                    See workout history <a href="/progress/workout">here</a>
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