import express from "express";
import { calculator } from "../controllers/calculateController.js";

const router = express.Router();
router.post("/calculate", calculator);

export default router;