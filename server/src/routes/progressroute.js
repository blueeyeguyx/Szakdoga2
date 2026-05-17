import express from "express";
import { weightTracker, workoutTracker, macroTracker } from "../controllers/progresscontroller.js";


const router = express.Router();
router.post("/weight",weightTracker);
router.post("/workout",workoutTracker);
router.post("/macros",macroTracker);
export default router;