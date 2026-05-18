import express from "express";
import {saveProgress } from "../controllers/progresscontroller.js";


const router = express.Router();
router.post("/log",saveProgress);
export default router;