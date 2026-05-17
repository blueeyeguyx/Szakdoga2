import express from "express";
import { calculating } from "../controllers/calculatecontroller.js";

const router = express.Router();
router.post("/",calculating);
export default router;